# HTTP 서버 만들기
# ❓ HTTP
**HTTP**는 (_Hyper Text Transfer Protocol_) 의 약자로 데이터를 주고 받을 수 있는 프로토콜을 말한다. `HTML`과 같은 `하이퍼미디어 문서`를 전송하기 위해 만들어졌다.

---
# 📌 서버 만들기
`http` 모듈을 사용해 서버를 만들었다. `http`모듈 내에는 `createServer` 메소드가 있는데 매개 변수로 요청에 대한 콜백 함수를 작성 할 수 있다. 따라서 요청에 의한 처리를 하고 싶다면 해당 부분에 함수를 작성하면 된다.

```js
const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(3000, () => {
    console.log("connecting http://localhost:3000");
});
```
_res는 response의 약자, req는 request의 약자이다._
`res.writeHead()`: 응답에 대한 정보를 기록하는 메소드, 현재 코드에선 200의 상태 코드를 전송하고 `Content-Type`을 통해 보내는 응답이 `HTML`임을 알리고 있음 해당 부분은 **헤더**에 속함
`res.write()`: 첫 번째 매개 변수는 클라이언트로 보낼 데이터를 말함. 여러 번 호출하여 데이터를 여러 개 보내는 것도 가능 데이터가 기록되는 부분을 **바디**라고 함.
`res.end()`: 요청에 대한 응답을 종료하는 메소드이다. 매개 변수가 있다면 해당 데이터도 클라이언트로 전송 한 뒤 응답을 종료.

---
# 📌 이벤트 리스너
`createServer()`이후 콜백으로 `.listen()`을 작성하는 것이 아닌 이벤트 리스너를 사용 할 수 있다.
```js
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello Server!</p>');
})

server.listen(3000);

server.on("listening", () => {
    console.log("connecting http://localhost:3000");
});

server.on("error", (err) => {
    console.error(err);
})
```
---
# 📌 파일 불러오기
`fs`모듈을 이용해 클라이언트의 요청을 `HTML`파일을 보낼 수 있다.

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
    <h1>fs 모듈 연습하기</h1>
    <p>백엔드 공부는 어려워...</p>
</body>
</html>
```
**app.js**
```js
const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile(`${__dirname}/public/views/index.html`);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(data);
        res.end();
    } catch (error) {
        console.error(error);
    }
})

server.listen(3000);

server.on("listening", () => {
    console.log("connecting http://localhost:3000");
});

server.on("error", (err) => {
    console.error(err);
})
```

![](https://velog.velcdn.com/images/chr1s0/post/d87442c0-175d-4974-a1e8-625dea237c50/image.png)
http://localhost:3000 에 접속하자 다음 사진과 같이 index.html의 내용이 출력되었다.

## 💡HTTP 상태 코드
코드에서는 성공을 알려주는 코드로 200을 사용했다. 이 처럼 상태코드를 보고 요청에 대한 응답을 판단 할 수 있다.
+ **2XX**: 요청에 대한 응답이 성공했음을 알리는 코드 `200(성공)`, `201(작성됨)` 등이 있다.
+ **3XX**: 다른 페이지로 이동을 알리는 상태 코드이다. 어떠한 주소를 입력했을 때 다른 주소의 페이지로 넘어갈 때 이 코드가 사용된다. `301(영구 이동)`, `302(임시 이동)`, `304(수정되지 않음)`
+ **4XX**: 요청 자체가 잘못 되었을 때를 나타냄 `400(잘못된 요청)`, `401(권한 없음)`, `403(금지됨)`, `404(찾을 수 없음)`
+ **5XX**: 서버 오류를 나타냄. 요청은 문제가 없지만 응답에 오류가 있는 경우 `response.writeHead()`로 직접 클라이언트에 보내는 것이 아닌 서버가 알아서 오류를 보냄 `500(내부 서버 오류)`, `502(불량 게이트웨이)`, `503(서비스를 사용할 수 없음)`