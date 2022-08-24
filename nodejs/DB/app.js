const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const sessionInit = require("./src/config/sessionSet");

dotenv.config();
const app = express();
const index = require("./routers/index");
const login = require("./routers/login");

app.use('/', index);
app.use('/login', login);

app.set('port', process.env.PORT || 3000);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public', 'views'));

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
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