const axios = require("axios");

const getData = async () => {
    try {
        const result = await axios.get("https://api.thedogapi.com/v1/images/search");
        console.log(result.data.url);
    } catch (error) {
        console.error(error);
    }
}


getData();