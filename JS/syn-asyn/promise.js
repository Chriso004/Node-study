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
});
