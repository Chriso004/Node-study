# 📌AJAX
>https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started 
해당 문서를 참고하였습니다.

AJAX는 비동기 자바스크립트와 XML을 말한다. `XMLHttpRequest` 객체를 사용하는 것을 말한다. JSON, XML, HTML 그리고 일반 텍스트 형식 등을 포함한 다양한 포맷을 주고 받을 수 있다. 무조건 XML만을 사용할 필요는 없으며 `JSON`방식도 많이 사용한다. AJAX의 가장 큰 장점은 **비동기성**인데 이를 활용하면 페이지를 새로고침 하지 않고 필요한 부분만 렌더링 할 수 있다.

---
# 📌XMLHttpRequest
서버와 상호작용할 때 사용한다. 주로 `AJAX`에 많이 사용되며, 명칭에 `XML`이 들어가나 모든 종류의 데이터를 받아 올 수 있다.

```js
const x = require("XMLHttpRequest");

const xhr = new x.XMLHttpRequest();

xhr.open("GET", "https://api.github.com/users/chriso004");
xhr.onreadystatechange = function() {
    if(xhr.status === 200 && xhr.readyState === xhr.DONE)
        console.log(typeof xhr.responseText);
    else
        console.error(xhr.responseText);
}
xhr.send();
```
---
# 📌axios
>https://axios-http.com/kr/docs/intro 문서를 참고하였습니다.

`axios`는 브라우저, Node.js를 위한 비동기 통신 라이브러리이다. 서버에서는 네이티브 node.js의 `http`모듈을 사용하고, 부라우저에서는 `XMLHttpRequests`를 사용한다.

## 🔴 GET 요청하기
```js
const axios = require("axios");

const getInfo = async () => {
    try{
        const result = await axios.get("https://api.github.com/users/chriso004");
        console.log(`name: ${result.data.login}\nurl: ${result.data.url}`);
    } catch(error) {
        console.error(error);
    }
}

getInfo();
```
GET 요청은 서버로 부터 데이터를 받는데 사용한다. `axios.get()` 사용시 `promise` 객체를 반환해준다.

---
## 🔴 POST 요청하기
POST 요청은 데이터를 서버로 보낼 수 있다. GET과 사용방법이 비슷하지만 매개변수로 데이터를 넣어 보내준다.
```js
const axios = require("axios");

const handleUserInfo = async () => {
    try {
        const response = await axios.get("https://api.github.com/users/chriso004");
        const userInfo = {
            name: response.data.login,
            github: response.data.url,
        };

        const result = await axios.post("https://www.google.com", userInfo);
        console.log(result);

    } catch (error) {
        console.error(error);
    }
}

handleUserInfo();
```

`post()`로 요청을 보내게 되면 다시 결과를 보내주는데 거기서 상태코드가 200이면 성공적으로 요청이 보내진 것이다. 또한 **구글**이나 **네이버**같은 사이트로 요청을 보내자 해당 사이트의 html이 result로 보내졌다.