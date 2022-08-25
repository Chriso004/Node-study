const express = require("express");

const router = express.Router();
const getGoods = require("../src/services/getGoods");

router.get("/", (req, res) => {
    res.render("dbManage.html");
});

router.get("/goods", async (req, res) => {
    const result = await getGoods();
    res.send(result);
});

module.exports = router;