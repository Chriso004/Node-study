const express = require("express");
const goods = require("../src/services/goods");
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await goods.getGoods();
    res.send(result);
});

router.post("/", async (req, res) => {
    const result = goods.updateGoods();
    res.send(result);
});

router.put("/", (req, res) => {
    res.send("put success");
});

router.delete("/", (req, res) => {
    res.send("delete success");
});

module.exports = router;