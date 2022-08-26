const mysql = require("mysql2");
const dbConfig = require("../config/dbConfig");
const cheerio = require("cheerio");
const axios = require("axios");
const goods = {};

goods.getGoods = () => {
    const pool = mysql.createPool(dbConfig);
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) throw error;
            connection.query("SELECT * FROM goods", (error, rows) => {
                if (error) reject(error);
                resolve(rows);
                connection.release();
            });
        })
    });
}

goods.updateGoods = async () => {
    try {
        const response = await axios.get("https://www.musinsa.com/ranking/best?new_product_yn=Y");
        const $ = cheerio.load(response.data);
        const goodsList = $("#goodsRankList > li");
        const pool = mysql.createPool(dbConfig);

        pool.getConnection((error, connection) => {
            if (error) throw error;
            goodsList.map((idx, elem) => {
                const brand = $(elem).find("div.li_inner > div.article_info > p.item_title").text().trim();
                let [price, salePrice] = $(elem).find("div.li_inner > div.article_info > p.price").text().trim().replace(/,/g, "")
                    .replace(/원/g, "").split(" ").join("").split("\n").map(Number);

                if (typeof salePrice === "undefined")
                    salePrice = price;

                const sql = "UPDATE goods SET name = ?, price = ?, salePrice = ? WHERE id = ?";
                connection.query(sql, [brand, price, salePrice, idx + 1], (error) => {
                    if (error) {
                        connection.release();
                        alert("DB 업데이트 오류 발생");
                        console.error(error);
                    }
                });
            });
            connection.release();
        });
    } catch (error) {
        alert("오류 발생");
        console.error(error);
    }
}

module.exports = goods;