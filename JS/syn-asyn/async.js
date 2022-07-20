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