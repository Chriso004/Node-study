const axios = require("axios");

const handleUserInfo = async () => {
    try {
        const response = await axios.get("https://api.github.com/users/chriso004");
        const userInfo = {
            name: response.data.login,
            github: response.data.url,
        };

        console.log(userInfo);

        const result = await axios.post("https://www.google.com", userInfo);
        console.log(result);

    } catch (error) {
        console.error(error);
    }
}

handleUserInfo();