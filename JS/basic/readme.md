# 📌const, let
+ const와 let은 블록 스코프(범위)를 가진다.

### 예시

```js
if (true){
	var x = 3;
}
console.log(x);

if (true) {
	const y = 3;

}
console.log(y);

const z = 1;
z = 3;
```
### 결과
```
3
Assignment to constant variable.
Uncaught ReferrenceError: y is not defined
```
+ 상수인 const는 한 번 값을 할당하면 다른 값을 할당할 수 없다.
+ 함수 스코프인 var과 다르게 const와 let은 블록 스코프를 가지므로 블록 밖에서는 접근 할 수 없다.
---
# 📌템플릿 문자열
+ 문자열 안에 변수를 넣어 작성할 수 있다.
+ 따옴표나 작은따옴표가 아닌 백틱( ` )문자로 감싼다. 

### 예시
```js
const name = "cHr1s0";
const age = "24";
const str = `name: ${name}\nage: ${age}`;

console.log(str)
```
### 결과
	name: cHr1s0 
    age: 24    
---
# 📌객체 리터럴
+ 객체 리터럴은 객체를 생성하는 방법 중 하나이며 중괄호`{}` 안에 프로퍼티를 생성한다.
### 예시
```js
const add = {
    a: 1,
    b: 2,
    sum: function() {
        return this.a + this.b
    }
}

console.log(add.a);
console.log(add.b);
console.log(add.sum());
```
### 결과
```
1
2
3
```
---
# 📌화살표 함수
+ `function() { //코드 작성 }`을 통해 함수를 작성 할 수 있지만, `=>`화살표를 통해 함수를 정의 할 수 있다.
+ 화살표 함수는 **익명 함수**로만 사용 가능하다.

### 예시
```js
function add(a, b) {
    return a + b;
} // function 선언자를 이용한 정의
const sub = (a, b) => a - b; // return을 생략 할 수 있다.
const mul = (a, b) => {
    return a * b;
} // 중괄호로 묶인경우 return을 작성 해줘야 한다.
const div = (a, b) => (a / b); // 대괄호로 묶어주는 경우 return을 생략할 수 있다.

const functions = [add, sub, mul, div];

functions.forEach(func => {
    console.log(func(1, 2));
})
```
### 결과
```
3
-1
2
0.5
```
---