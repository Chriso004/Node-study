const axios = require("axios");

const getInfo = async () => {
    try{
        const result = await axios.get("http://localhost:3000");
        console.log(result);
    } catch(error) {
        console.error(error);
    }
}

getInfo();