/* eslint-disable no-unused-vars */

const getGoods = async () => {
    try {
        const result =  await axios.get("/goods");
        const data = result.data;
        console.log(data);
        alert("DB 전송 완료");
    } catch(error) {
        alert("오류 발생");
        console.error(error);
    }
}

const updateGoods = async () => {
    try {
        await axios.post("/goods");
        alert("DB 업데이트 완료");
    } catch(error) {
        alert("오류 발생");
        console.error(error);
    }
}