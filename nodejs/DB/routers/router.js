const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.html");
});

router.get("/login", (req, res) => {
    res.render("login.html");
});

router.get("/db", (req, res) => {
    res.render("db.html");
});

router.get("/test", (req, res) => {
    res.render("test.htlm");
});

module.exports = router;