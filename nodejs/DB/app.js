const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const sessionInit = require("./src/config/config");

dotenv.config();
const app = express();
const index = require("./routers/router");
const goods = require("./routers/goods");

app.use("/", index);
app.use("/goods", goods);

app.set('port', process.env.PORT || 3000);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public', 'views'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/script', express.static(path.join(__dirname, 'public', 'js')));
app.use('/config', express.static(path.join(__dirname, 'src', 'config')));
app.use('/services', express.static(path.join(__dirname, 'src', 'services')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionInit));

app.use((err, req, res, next) => {
    res.json({ message: err.message });
});

app.listen(app.get('port'), () => {
    console.log("listening to http://localhost:3000");
});