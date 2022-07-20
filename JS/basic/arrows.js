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