const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("user.html");
});

router.get("/about", (req, res) => {
    res.send("about users");
});

router.get("/about/:id/:name", (req, res) => {
    console.log(req.params.id, req.params.name, req.query);
    res.send("send to console!");
});

module.exports = router;