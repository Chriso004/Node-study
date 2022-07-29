> https://expressjs.com/ko/guide/using-middleware.html 공식 문서를 참고하였습니다.

# ✅ 미들웨어
미들웨어는 익스프레스의 핵심이다. 요청과 응답의 사이에 위치한다. 미들웨어 함수는 일반적으로 `next`라는 이름을 가진다.

### 💡 미들웨어 함수의 역할
+ 모든 코드를 실행.
+ 요청 및 응답 오브젝트에 대한 변경을 실행.
+ 요청-응답 주기를 종료.
+ 스택 내의 그 다음 미들웨어 함수를 호출.

**middle_app.js**

```js
const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
    res.send("미들웨어 함수를 실행하지 않으면 이후 코드인 index.html을 불러 올 수 없음");
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/views/index.html"));
});

app.listen(app.get("port"), () => {
    console.log(`connecting to http://localhost:${app.get("port")}`);
});
```
위 코드는 미들웨어를 적용하지 않은 코드이다. 라우팅을 사용하여 `index.html`을 불러오게 하였지만 `app.use()`에서 모든 요청을 처리한 뒤, `next()`로 다음 미들웨어로 넘겨주지 않아 실행 되지 않는다.

```js
...
app.use((req, res, next) => {
    console.log("미들웨어 함수를 실행하지 않으면 이후 코드인 index.html을 불러 올 수 없음");
    next();
})
...
```
따라서 `next()`를 추가하여 모든 요청에 대해 해당 콘솔 내용을 출력하고 다음 미들웨어로 넘어가게 한다.

---
# 📌 morgan
morgan은 HTTP 요청에 대한 로깅을 도와주는 미들웨어 패키지이다.
```
$ npm i morgan
```
설치는 간단하다. 
```js
app.use(morgan("dev"));
```
이후 해당 코드를 추가하게 되면 HTTP 요청과 응답에 대한 로그를 볼 수 있다.
![](https://velog.velcdn.com/images/chr1s0/post/5c3005d7-7fbe-4772-9efe-861de7bbaabe/image.png)
`dev`모드를 적용한 상태이며 이외에 `combined` `common` `short` `tiny`등을 사용 할 수 있다.

---
# 📌 static
> https://expressjs.com/ko/starter/static-files.html 공식 문서를 참고하였습니다.

static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 한다. `express` 객체 안에 존재하므로 그냥 `express.static`을 사용하면 된다.
```js
app.use(express.static('public'));
```
해당 코드의 경우 `public/` 디렉토리에 포함된 파일들을 로드 할 수 있다.
여러 번 호출하면 여러 개의 정적 디렉토리를 사용 할 수 있다.

---
# 📌 body-parser
`body-parser`는 request의 본문에 있는 데이터를 해석하여 req.body로 만들어주는 미들웨어이다. 보통 폼 데이터나 `AJAX`의 요청 데이터를 처리하는데 이미지, 동영상, 파일 등의 데이터는 처리하지 못한다.
```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```
별도의 설치 없이 해당 코드를 사용하면 내가 원하는 방식으로 데이터를 parsing 할 수 있다.

---
# 📌 cookie-parser
> https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-bodyParser-cookieParser-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4 
해당 문서를 참고하였습니다.

cookie-parser는 요청에 포함되어 있는 쿠키를 해석해서`req.cookies` 객체로 parsing 한다.

```js
app.use(cookieParser("key"));
```
쿠키를 읽어오는 코드이다. 매개 변수를 넣지 않아도 되지만, 서명된 쿠키를 사용하려면 매개 변수로 **비밀키**를 보내주면 검증을 한다. 해당 함수로 parsing이 완료되면 `req.cookies`로 접근 할 수 있다.

### 💡 쿠키 만들기
`res.cookie()` 함수를 통해 쿠키를 만든다.

**내부 옵션**
+ maxAge : 만료 시간을 밀리초 단위로 설정
+ expires : 만료 날짜를 GMT 시간으로 설정
+ path : 쿠키 경로 (디폴트 값은 "/")
+ domain : 도메인 네임 디폴트 값은 `"loaded"`
+ secure : https에서만 쿠키를 사용할 수 있도록 한다
+ httpOnly : 웹서버를 통해서만 쿠키에 접근할 수 있도록 한다
+ signed : 쿠키에 대한 서명을 지정한다

```js
res.cookie("name", "chr1s0", {
	expires: new Date(Date.now() + 3600000),
  	httpOnly: true,
  	secure: true,
});
res.clearCookie("name", "chr1s0", { httpOnly: true, secure: true });
```
쿠키는 `res.cookie()`를 위와 같이 사용하여 생성 할 수 있고, 반대로 삭제는 `clearCookie()`를 사용하는데 키 값과 옵션 모두가 동일해야 쿠키가 삭제된다.
_옵션 중 `signed`라는 옵션이 존재하는데 해당 옵션을 `true`로 설정하면 쿠키 뒤에 서명이 붙어 쿠키를 검증 할 수 있다._

---

# 📌 express-session
세션을 관리해주는 미들웨어이다. 쿠키는 브라우저에 저장이 되어 변조의 위험성도 높고, 안전하지 않지만 세션은 브라우저가 아닌 서버에 저장되는 데이터이다.
**express-session**은 로그인을 구현하거나 관리자 등 특정 사용자를 위한 데이터를 임시로 저장해 둘 때 유용하다.

```js
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
```
쿠키와 비슷하게 여러 옵션들을 설정하여 세션을 생성 할 수 있다. `store`라는 옵션이 존재하는데 메모리에 세션을 저장하도록 되어있다. 그러나 서버를 재시작하면 메모리가 초기화되어 세션이 사라진다. 따라서 세션을 유지하며 관리를 하려면 데이터베이스를 연결하여 세션을 저장해주어야 한다. `Redis`를 주로 사용한다.
_세션을 삭제하고 싶다면 `req.session.destroy`를 사용하면 되고, 세션의 값을 수정하고 싶다면 `req.session` 객체에 직접 값을 대입하여 구성한다._

---
# 📌 multer
multe는 이미지, 동영상 등을 비롯하여 여러 가지 파일들을 멀티 파트 형식으로 업로드 할 때 사용하는 미들웨어이다.

**app.js**
```js
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

```
**multer.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form id="form" action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="image1" />
        <input type="file" name="image2" />
        <input type="text" name="title" />
        <button type="submit">업로드</button>
    </form>
</body>
</html>

```
```
  image1: [
    {
      fieldname: 'image1',
      originalname: '44536955.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: 'uploads/',
      filename: '445369551659059183198.png',
      path: 'uploads/445369551659059183198.png',
      size: 17406
    }
  ],
  image2: [
    {
      fieldname: 'image2',
      originalname: 'á\x84\x89á\x85³á\x84\x8Fá\x85³á\x84\x85á\x85µá\x86«á\x84\x89á\x85£á\x86º 2022-07-22 á\x84\x8Bá\x85©á\x84\x8Cá\x85¥á\x86« 11.04.11.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: 'uploads/',
      filename: 'á\x84\x89á\x85³á\x84\x8Fá\x85³á\x84\x85á\x85µá\x86«á\x84\x89á\x85£á\x86º 2022-07-22 á\x84\x8Bá\x85©á\x84\x8Cá\x85¥á\x86« 11.04.111659059183200.png',
      path: 'uploads/á\x84\x89á\x85³á\x84\x8Fá\x85³á\x84\x85á\x85µá\x86«á\x84\x89á\x85£á\x86º 2022-07-22 á\x84\x8Bá\x85©á\x84\x8Cá\x85¥á\x86« 11.04.111659059183200.png',
      size: 56654
    }
  ]
```
`req.body`로 요청을 확인하였다. minetype이 image이고, 다른 속성들을 확인 할 수 있었다.