> https://expressjs.com/ko/ _공식 문서를 참고하였습니다._

# ❓ Express
웹 및 모바일 애플리케이션을 위한 `Node.js` 웹 애플리케이션이다.

---
# 🔨 Express 프로젝트 시작
```
$ npm i express
$ npm i -D nodemon
```
npm을 이용해 `express`와 `nodemon`을 설치한다. `nodemon`은 지정한 영역에 코드의 변화를 감지하면 서버를 자동으로 재실행 시켜준다.
```
$ nodemon --watch src/ app.js
```
위 코드는 `src/` 디렉토리의 변화를 감지하면 `app.js`를 자동으로 재실행 시켜주는 명령어가 된다.
```
$ npm init -y
```
해당 명령어를 사용하여 `package.json`을 생성한다.

**package.json**
```json
{
  "name": "express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon --watch public/src app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}

```
`"start": "nodemon --watch public/src app"`를 추가하여 위에서 설명한 것 처럼 `public/src` 디렉토리에 변화가 생기면 `app.js`를 재실행하는 문구를 추가한다.

**app.js**
```js
const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.listen(app.get("port"), () => {
    console.log(`connecting to http://localhost:${app.get("port")}`);
});
```
서버를 구축하는 코드이다. http서버를 만들 때와 비슷하게 `express.set()`으로 포트를 설정하고 `express.get()`으로 라우팅을 지정해준다.

## 📌 senfFile()
**app.js**
```js
const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/src/views/index.html"));
});

app.listen(app.get("port"), () => {
    console.log(`connecting to http://localhost:${app.get("port")}`);
});
```
**index.html**
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
    <h1>라우팅 연습</h1>
    <h2>sendFile 활용</h2>
</body>
</html>
```
클라이언트의 요청에 단순 문자열 이외에 `HTML`로 응답하고 싶으면 `sendFile()`을 사용하면 된다.

---