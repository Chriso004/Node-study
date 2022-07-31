# 📌 Router 객체
이전에 라우터를 만들 때 `app.get()`을 사용하여 라우팅을 하였는데, 그렇게 처리를 할 경우 연결해야 할 라우터의 양이 늘어나게 되면 코드가 매우 길어지게 된다. 따라서 express에 존재하는 라우터 객체를 사용한다. `express.Router()`

`./routers/user.js` 파일을 생성한다.
```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("user.html");
});

router.get("/about", (req, res) => {
    res.send("about user");
})

module.exports = router;
...
```
`http://localhost:3000/user`의 요청이 오면 **user.html**을 렌더링 해주고, `http://localhost:3000/user/about`의 요청이 오면 **about index**라는 메세지로 응답한다.


`./routers/index.js`

```js
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
```
위 코드는 `http://localhost:3000/`의 요청이 오면 **index.html**을 렌더링 해준다. `/about`에선 `next("route")`의 코드가 사용되었는데 해당 코드는 라우터에 연결된 다른 미들웨어를 모두 건너뛰고 다음 라우터로 이동시킨다. 따라서 중간에 존재하는 `res.send()`를 스킵하고, `about index`라는 메세지를 응답하게 된다.

---
# 📌 라우터 매개변수
```js
router.get("/user/:id/:name", (req, res) => {
	console.log(req.params.id, req.params.name, req.query);
});
```
`:id`는 해당 문자를 그대로 나타내는 것이 아니라 `/user/*`과 같이 뒤에 어떠한 매개 변수가 오더라도 처리가 가능합니다. 만약 회원 정보를 조회한다고 치면 해당 url 부분에 유저의 아이디를 포함하여 요청`/user/cHr1s0`을 하고 해당 요청받은 ID를 통해 조회하도록 처리 할 수 있습니다.

`req.params`는 `:id`에 해당하는 값이다. 만약 라우터가 `/user/:id/:name`이라면 `req.params.id, req.params.name`을 통해 해당 값들을 확인 할 수 있다.

`req.query`는 쿼리 문자열에 대한 매개 변수에 대한 속성을 말한다. 예를 들어 `http://localhost:3000/user/about/111/cHr1s0?permission=admin`이라면 출력은
_111 cHr1s0 { permission: 'admin' }_이 된다.

---
# 📌 req, res 객체
express의 req, res 객체는 http 모듈의 res, req 객체를 확장한 것이다. 따라서 기존 http 모듈의 메소드나, express의 메소드나 속성을 사용 할 수 있다.

## 💡 req 객체
+ **req.app**: req 객체를 통해 app 객체에 접근 할 수 있다.
+ **req.body**: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체이다.
+ **req.cookies**: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.
+ **req.ip**: 요청의 ip 주소가 담겨 있다.
+ **req.params**: 라우트 매개변수에 대한 정보가 담겨있다.
+ **req.query**: 쿼리 스트링에 대한 정보다 담겨있다.
+ **req.signedCookies**: 서명된 쿠키들이 담겨있다.
+ **req.get(헤더 이름)**: 헤더의 값을 가져오고 싶을 때 사용한다.

## 💡 res 객체
+ **res.app**: req.app와 동일하게 res 객체를 통해 app에 접근 가능하다.
+ **res.cookie(키, 값, 옵션)**: 쿠키를 설정하는 메소드이다.
+ **res.clearCookie(키, 값, 옵션)**: 쿠키를 제거하는 메소드이다.
+ **res.end()**: 데이터 없이 응답을 보낸다.
+ **res.json(매개 변수)**: JSON형식의 응답을 보낸다.
+ **res.redirect(주소)**: redirect할 주소와 함께 응답을 보낸다.
+ **res.render(뷰, 데이터)**: 템플릿 엔진을 렌더링하는 것으로 응답한다.
+ **res.send(데이터)**: 데이터와 함께 응답을 보낸다. 다양한 종류의 데이터를 보낼 수 있다.
+ **res.sendFile(경로)**: 경로에 있는 파일로 응답한다.
+ **res.set(헤더, 값)**: 응답의 헤더를 설정한다.
+ **res.status(코드)**: 응답시의 상태 코드를 지정한다.