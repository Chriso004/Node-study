const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile(`${__dirname}/public/views/index.html`);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(data);
        res.end();
    } catch (error) {
        console.error(error);
    }
})

server.listen(3000);

server.on("listening", () => {
    console.log("connecting http://localhost:3000");
});

server.on("error", (err) => {
    console.error(err);
})