> https://github.com/Chriso004/Node-study/tree/main/React/react-practice

> https://ko.reactjs.org/docs/components-and-props.html
공식 문서를 참고하였습니다.

# 📌 component
React에서의 component는 React 앱을 이루는 **최소한의 단위**를 말한다.
props와 state를 받아 상태에 따른 DOM 노드를 생성한다.
component를 정의하는 방법은 **함수 컴포넌트**와 **클래스 컴포넌트**로 정의하는 방법이 있다.

## 💡 함수 컴포넌트
```jsx
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>
}
```

## 💡 클래스 컴포넌트
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

---

# 📌 props
React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 객체를 “props”라고 한다. 한마디로, **부모 컴포넌트에서 자식 컴포넌트로 전달해주는 객체**를 말한다.

component를 렌더링 할 때 사용자 정의 컴포넌트도 렌더링 할 수 있다.
```jsx
const header = <Welcome name="cHr1s0" />;
```
이 코드는 `props`를 { "name": "cHr1s0" }으로 하여 **Welcome** 컴포넌트를 호출하게 된다. 이후 **Welcome** 컴포넌트에서는 `Hello, cHr1s0` 라는 문자열로 `h1` 태그를 반환하게 된다.
**_사용자 정의 컴포넌트는 항상 대문자로 시작해야 한다._**

## ❗props는 읽기 전용

props에 대한 엄격한 규칙이 있다. **모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작**해야 한다는 것이다. 여기서 순수 함수란 입력 값을 바꾸지 않고 항상 같은 입력에 대해 같은 출력을 해주는 함수를 말한다.

---

# 📌 state

`state`도 `props`와 동일하게 자바스크립트 객체이다. 두 객체는 모두 렌더링에 영향을 주는 데이터를 가지고 있다. 그렇다면 둘의 차이점은 무엇일까? `props`는 **함수의 매개변수** 처럼 사용되는 반면에 `state`는 **함수 내 지역변수** 처럼 사용 된다고 한다. 우리가 매 초 갱신되는 시계를 만든다고 생각해보자.
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
const render = () => {
  const time = (
    <>
      <h1>현재 시간</h1>
      <h2>{new Date().toLocaleTimeString()}</h2>
    </>
  );
  root.render(
    time
  );
}
setInterval(render, 1000);
```
이 처럼 매 초 새롭게 결과를 반환받아 렌더링을 해주어야 될 것이다.

## 💡 state 
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>현재 시간</h1>
        <h2>{this.state.toLocalTimeString()}</h2>
      </div>
    );
  }
}
```
기존의 state는 이런 방식으로 생성을 해야 했었다. `constructor()`를 사용하여 `state`를 초기화 하고 사용한다.

**Hook**이 추가되고 나선, state를 클래스 형식이 아니라 함수 형식으로도 작성 할 수 있게 되었다.
```jsx
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>클릭 횟수: { count }</h1>
      <button onClick={() => setCount(count + 1) }>Click me</button>
    </>
  );
}
```

Hook을 이용해서 시계 코드를 수정하면
```jsx
const App = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  setInterval(() => setTime(new Date().toLocaleTimeString()) ,1000);
  return (
    <>
      <h1>현재 시간</h1>
      <h2>{time}</h2>
    </>
  );
}
```
이렇게 수정 할 수 있다. `const [time, setTime] = useState();` 이 부분은 구조분해 할당을 한 것인데 `useState()`를 사용하게 되면 time에는 초기 상태, setTime은 setter 함수가 반환됩니다. 따라서 `setTime()`을 사용하게 되면 time의 값을 변화 시킬 수 있습니다.

---

# 📌 생명주기
위에서 작성한 state 클래스 형식에 생명주기를 추가 할 것입니다.

**Clock**이 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 한다. 이것은 React에서 `마운팅`이라고 한다.

또한 **Clock**에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하려고 한다. 이것은 React에서 `언마운팅`이라고 한다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`componentDidMount()` 메소드는 컴포넌트가 렌더링 된 이후에 실행된다. 따라서 타이머가 DOM에 렌더링 된 후 `setInterval()`이 실행되어 매 초 마다 반복된다.
`componentWillUnmount()` 메소드는 컴포넌트가 제거 될 때 실행된다. 이 메소드 내에서는 연결된 이벤트 리스너 등 컴포넌트와 연결된 것들을 정리 할 때 사용한다.

---

# ❗state 주의사항

## 💡 state를 직접 수정하면 안된다.

이 코드는 컴포넌트를 다시 렌더링 하지 않는다.
```jsx
this.state.count = this.state.count + 1;
```

이와 같이 사용해야 state가 수정 되었을 때 다시 렌더링이 된다.
```jsx
this.setState({ count: state.count + 1; });
```

## 💡 state는 비동기적으로 작동한다.
 
따라서 이 코드는 제대로 작동하지 않을 수 있다.
```jsx
this.setState({ count: this.state.count + this.props.increase });
```

이와 같이 사용해야 한다.
```jsx
this.setState((state, props) => { count: state.count + props.increase }));
```