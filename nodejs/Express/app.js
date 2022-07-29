const express = require("express");
const morgan = require("morgan");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public/src")));
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

try {
    fs.readdirSync("uploads");
} catch(error) {
    console.error("uploads 폴더가 없어 폴더를 생성합니다.");
    fs.mkdir("uploads", (error) => {
        console.error(error);
    });
}
const upload = multer ({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
})

app.get("/upload", (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/views/multer.html`));
});

app.post("/upload",
    upload.fields([{ name: "image1" }, { name: "image2" }]),
    (req, res) => {
        console.log(req.files, req.body);
        console.log(req.body);
        res.send("ok");
    },
);

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/views/index.html`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("오류 발생");
});

app.listen(app.get("port"), () => {
    console.log(`connecting to http://localhost:${app.get("port")}`);
});
