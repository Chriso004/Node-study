const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/views/index.html"));
});

app.listen(app.get("port"), () => {
    console.log(`connecting to http://localhost:${app.get("port")}`);
});