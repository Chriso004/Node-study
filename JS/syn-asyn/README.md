# 📌이벤트
>https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events
참고하였습니다.

이벤트란 프로그래밍하고 있는 시스템에서 일어나는 사건(action) 혹은 발생(occurrence)인데, 이는 여러분이 원한다면 그것들에 어떠한 방식으로 응답할 수 있도록 시스템이 말해주는 것이다.
예를 들어, **특정 이미지를 클릭했을 때 해당 이미지가 클릭 되었다는 것**을 이벤트를 통해 알려주게 된다.

---

## ❓이벤트 기반
이벤트 기반이란 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식을 말한다.
이벤트 기반 시스템에서는 특정 이벤트가 발생할 때 어떤 작업을 수행할 지 등록 해둬야 한다.
###### **ex) 마우스 이벤트(onMouseEnter, onMouseExit), 폼 이벤트(submit, reset), 키보드 이벤트(keydown, keyup) 등등... **

## ❓이벤트 루프
이벤트 발생시 호출할 콜백 함수들을 관리하고, 호출된 콜백 함수의 실행 순서를 결정하는 역할을 담당한다. 종료시까지 반복하기 때문에 루프(loop)라고 불린다.

---

# 📌동기/비동기
자바스크립트는 단일 스레드로 한 번에 하나의 작업만 수행 할 수 있다. 따라서 동기/비동기는 자바스크립트에 있어 중요한 개념이다.

## ❓동기
자바스크립트는 한 번에 하나의 작업만 수행 할 수 있다고 했다. 따라서 시간이 오래 걸리는 작업이 수행 중인 경우 해당 작업이 마무리 될 때 까지 계속 기다린다.
```js
const sleep = () => {
    let count = 0;
  console.log("자는 중...");

    while(count < 10000000000) {
      count++;
  }
}

console.log("침대로 이동...");
sleep();
console.log("잘잤다!");
```

`sleep()` 함수 처럼 시간이 오래걸리는 작업이 있다면 해당 작업이 종료 될 때 까지 무작정 기다리게 된다.

## ❓비동기
비동기는 동기 방식과 다르게 작업의 완료 여부와 상관없이 다음 작업을 수행한다. **상황에 따라 다르겠지만** 만약 웹 페이지의 이미지를 불러오는데 너무 오래 걸리거나, 오래 걸리는 `이벤트(event)`가 발생했을 때 기다리지 않고 다음 작업을 수행하는게 더 좋은 방법이 될 수 있기 때문이다.
```js
const sleep = () => {
    let count = 0;
  console.log("자는 중...");

    while(count < 10000000000) {
      count++;
  }
}

console.log("침대로 이동...");
setTimeout(sleep, 0);
console.log("잘잤다!");
```
위의 코드와 다르게 setTimeout을 통해 비동기 처리를 하였다. 실행 결과는 `sleep()` 함수를 끝까지 기다리는 것이 아니라 이후 작업인 `잘잤다!`를 먼저 수행 하게 된다. 
>`setTimeout(sleep, 0)`으로 0ms의 딜레이를 설정하긴 하였으나 기본적인 지연시간이 존재하므로`잘잤다!`가 먼저 실행되었습니다.

---
# 📌프로미스
자바스크립트는 비동기를 자주 다루게 되는데 예전에 사용하던 방식은 `콜백(call back)`을 활용해 사용하였으나, 가독성도 떨어지고 _콜백 지옥_ 이라고 불리는 현상으로 ES2015버전 부터는 `프로미스`라는 것이 생겼다.
+ 프로미스는 요청의 결과 여부에 따라 resolve, reject로 나뉜다.
```js
const num1 = 10;
const promise1 = new Promise((resolve, reject) => {
    if (num1 == 10)
        resolve("요청 성공!");
    else
        reject("실패");
})

const num2 = 1;
const promise2 = new Promise((resolve, reject) => {
    if (num2 == 10)
        resolve("요청 성공!");
    else
        reject("실패");
})

promise1.then((msg) => {
    console.log(msg); //요청이 성공한 경우에 메세지 출력
}).
catch((error) => {
    console.error(error); //실패한 경우 에러 출력
})

promise2.then((msg) => {
    console.log(msg);
}).
catch((error) => {
    console.error(error);
})
```
여기서 `then()`은 프로미스가 요청을 하고 난 뒤, 실행하는 코드이다.
만약 웹 페이지로 부터 이미지를 전송해달라고 요청을 한다고 하면 프로미스 객체가 반환이 되는데 성공적으로 이미지를 전송받았다면 `resolve` 실패했다면 `reject`가 될 것이다.

---
# 📌async/await

> https://ko.javascript.info/async-await 페이지를 참고하였습니다.

프로미스가 `콜백 지옥`을 어느정도 해결했다고 하지만 반복되는 `try`와 `catch`를 자주 사용해야 하기에 아직도 조금 복잡해 보일 수 있다. `async`와 `await`을 사용하면 프로미스를 더 편리하게 사용할 수 있다.
```js
const findUser = () => {
    const response = fetch("https://api.github.com/users/chriso004");
    response.then((response) => {
        return response.json();
    })
    .then((user) => { 
        console.log(`id: ${user.login}\nurl: ${user.html_url}`);
    })
    .catch(error => {
        console.error(error);
    })
}

findUser();
```
```
id: Chriso004
url: https://github.com/Chriso004
```
`async/await`을 사용하지 않은 코드이다. `then()`을 사용하여 요청이 완료 되었을 때, 유저의 닉네임과 깃허브 주소를 출력하는 코드이다. 이 코드를 `async/await`을 사용하면 더 간결하게 나타낼 수 있다.
```js
const findUser = async () => {
    try {
        const response = await fetch("https://api.github.com/users/chriso004");
        const user = await response.json();
        console.log(`id: ${user.login}\nurl: ${user.html_url}`);
    } catch(error) {
        console.error(error);
    }
}

findUser();
```
함수 선언부에 `async` 키워드를 추가하고 응답을 기다려야하는 `fetch()`와 `json()`에 `await` 키워드를 추가하여 코드의 가독성을 더욱 높일 수 있다. `await`은 해당 프로미스가 `resolve` 될 때 까지 기다린 뒤 다음 로직으로 넘어가도록 한다.