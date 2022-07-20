// const findUser = () => {
//     const response = fetch("https://api.github.com/users/chriso004");
//     response.then((response) => {
//         return response.json();
//     })
//     .then((user) => { 
//         console.log(`id: ${user.login}\nurl: ${user.html_url}`);
//     })
//     .catch(error => {
//         console.error(error);
//     })
// }

// findUser();

const findUser = async () => {
    try {
        const response = await fetch("https://api.github.com/users/chriso004");
        const user = await response.json();
        console.log(`id: ${user.login}\nurl: ${user.html_url}`);
    } catch(error) {
        console.error(error);
    }
}

findUser();