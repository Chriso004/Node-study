const x = require("XMLHttpRequest");

const xhr = new x.XMLHttpRequest();

xhr.open("GET", "https://api.github.com/users/chriso004");
xhr.onreadystatechange = function() {
    if(xhr.status === 200 && xhr.readyState === xhr.DONE)
        console.log(typeof xhr.responseText);
    else
        console.error(xhr.responseText);
}
xhr.send();