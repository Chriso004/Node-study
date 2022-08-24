// 무신사 실시간 랭킹 상품 받아오기

const axios = require("axios");
const cheerio = require("cheerio");

const getGoods = async () => {
    try {
        const response = await axios.get("https://www.musinsa.com/ranking/best?new_product_yn=Y");
        const $ = cheerio.load(response.data);
        const goodsList = $("#goodsRankList > li");
        const goods = [];

        goodsList.map((idx, elem) => {
            const rank = $(elem).find(".n-label").text().trim();
            const brand = $(elem).find("div.li_inner > div.article_info > p.item_title").text().trim();
            const [price, salePrice] = $(elem).find("div.li_inner > div.article_info > p.price").text().trim().split(" ").join("").split("\n");

            goods.push({
                rank: rank,
                brand: brand,
                price: price,
                salePrice: salePrice
            });

        });
        
        return goods;
    }
    catch (error) {
        console.log(error);
    }
}

getGoods();