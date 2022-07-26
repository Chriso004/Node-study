const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(3000, () => {
    console.log("connecting http://localhost:3000");
});