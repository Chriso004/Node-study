const express = require("express");
const morgan = require("morgan");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const index = require("./routers/index");
const user = require("./routers/user");

app.set("port", process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set("views", `${__dirname}/public/views`);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: "session-cookie",
}));

app.use("/", index);
app.use("/user", user);

app.use((req, res, next) => {
    res.status(404).send("Not found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("오류 발생");
})

app.listen(app.get("port"), () => {
    console.log(`connecting to http://localhost:${app.get("port")}`);
});