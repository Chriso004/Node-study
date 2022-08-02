> https://ko.reactjs.org/docs/hello-world.html
공식 문서를 참고하였습니다.

# 📌 JSX

`JSX`는 자바스크립트에 XML을 확장시킨 문법이다. React를 개발할 때 사용되나 공식 자바스크립트 문법은 아니다. _브라우저에서 실행 전 Babel을 사용해 일반적인 문법으로 변화하게 된다._
ex)
```jsx
const header = <h1>Hello World!</h1>;
```
이 처럼 자바스크립트 코드처럼 보이나 HTML 코드이기도 한 신기한 문법이다. _어쨌거나 가독성은 정말 좋은 것 같다._

 + ## 💡 표현식 작성
```jsx
const App = () => {
  const name = 'cHr1s0';
  return (
    <div className="App">
      <h1>Hello {name}!</h1>
    </div>
  );
}
 ```
 중괄호 안에는 `유효한 JavaScript` 코드를 작성 할 수 있다고 한다. 즉, `2 + 2`, `user.getName()`, `add(1, 2)`와 같은 코드를 작성 할 수 있다는 것이다.
 
 ```jsx
const info = user => {
  return user.name + ' ' +user.age;
}

const user = {
	name: 'cHr1s0',
  age: 24
}

const App = () => {
  return (
    <div className="App">
      <h1>Hello {info(user)}!</h1>
    </div>
  );
}

export default App;

 ```
 따라서 이런식의 코드도 작성이 가능하다. 또한 표현식이기 때문에 `조건문`이나 `반복문`에도 사용이 가능하다.
```jsx
const isAdmin = (id) => {
  if (id === admin.id)
    return <h1>Hello admin {id}!</h1>
  else
    return <h1>Hello Guest!</h1>
}

const admin = {
  id: 'cHr1s0'
};

const App = () => {
  return (
    <div className="App">
        <h1>{isAdmin('cHr1s0')}</h1>;
        <h1>{isAdmin('stranger')}</h1>;
    </div>
  );
}

export default App;

```

`img`, `a href`등 여러 속성을 지정 할 수 있다.
```jsx
const App = () => {
  //const url = 'https://github.com/Chriso004'
  //const link = {url}>link</a>;
  const link = <a href='https://github.com/Chriso004'>link</a>;
  
  return (
    <div className="App">
      <h1>Hello My Name is cHr1s0</h1>
      {link}
    </div>
  );
}

export default App;

```

자식 태그를 포함 할 수 있기 때문에 이와 같은 코드도 가능하다
```jsx
const user = {
  name: 'cHr1s0'
};

const div = (
  <div>
    <h1>Hello World!</h1>
    <h1>{user.name}'s Project!</h1>
  </div>
);

const App = () => {

  return (
    div
  );
}

export default App;

```

# 📌 Babel
**Babel은 자바스크립트 컴파일러이다.** `자바스크립트는 인터프리터 언어인데?` 라는 질문을 할 수 있다. 브라우저는 정말 많은 종류가 있다. 그러나 모든 브라우저가 최신 문법을 지원하지 않는다 따라서 크롬에서는 잘 돌아가는 코드가 다른 브라우저에서는 작동하지 않을 수도 있다는 것이다. Babel의 역할은 코드들이 모든 브라우저에서 작동 할 수 있도록 문법을 구버전으로 바꾸어 줄 수 있다.

```js
const foo = () => console.log('Hello World!');
```
화살표 함수는 **ES6**버전에서 처음 등장하였다. 그렇다면 ES6 문법을 지원하지 않는 브라우저가 있다면 어떻게 해야할까
```js
const foo = function() {
	console.log('Hello World!');
}
```
이처럼 코드를 수정해야 할 것이다. 이 작업을 Babel이 해준다고 생각하면 된다.
**Babel은 JSX문법도 지원하기에 React에서 사용하기 유용하다.**

```jsx
const header = (
    <div>
        <h1 className="main_header">This is Header</h1>
    </div>
);
```
이 코드는 바로 HTML로 불러와 사용하면 실행되지 않는다. Babel은 JSX 문법을 `React.createElement()`로 변환하여 컴파일 한다.
```jsx
const header = React.createElement(
    'div',
    'h1',
    {className: 'main_header'},
    'This is Header'
);
```
이와 같은 코드로 변하게 된다.