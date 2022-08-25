// 무신사 실시간 랭킹 상품 받아오기

const axios = require("axios");
const cheerio = require("cheerio");
const sql = require("mysql2");
const dbConfig = require("../config/dbConfig");

const goodsUpdate = async () => {
    try {
        const response = await axios.get("https://www.musinsa.com/ranking/best?new_product_yn=Y");
        const $ = cheerio.load(response.data);
        const goodsList = $("#goodsRankList > li");

        const db = sql.createConnection(dbConfig);

        db.connect();

        goodsList.map((idx, elem) => {
            const brand = $(elem).find("div.li_inner > div.article_info > p.item_title").text().trim();
            let [price, salePrice] = $(elem).find("div.li_inner > div.article_info > p.price").text().trim().replace(/,/g, "")
                .replace(/원/g, "").split(" ").join("").split("\n").map(Number);
            if (typeof salePrice === "undefined")
                salePrice = price;
            const sql = "UPDATE goods SET name = ?, price = ?, salePrice = ? WHERE id = ?";
            db.query(sql, [brand, price, salePrice, idx + 1], (error) => {
                if (error) {
                    db.end();
                    console.error(error);
                }

            });
        });
        console.log("업데이트 완료");
        db.end();
    }
    catch (error) {
        console.log(error);
    }
}
