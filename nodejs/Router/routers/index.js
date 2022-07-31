const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.html")
});

router.get("/about", (req, res, next) => {
    next("route");
}, (req, res, next) => {
    res.send("두 번째로 실행되고 싶어");
    next();
}, (req, res, next) => {
    res.send("세 번째로 실행되고 싶어");
    next();
});

router.get("/about", (req, res) => {
    res.send("about index");
});

module.exports = router;