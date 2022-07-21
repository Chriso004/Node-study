const axios = require("axios");

const t = await axios.get("www.naver.com");
const getInfo = async () => {
    try{
        const result = await axios.get("https://api.github.com/users/chriso004");
        console.log(`name: ${result.data.login}\nurl: ${result.data.url}`);
    } catch(error) {
        console.error(error);
    }
}

getInfo();