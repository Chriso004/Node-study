const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        if (req.url === "/") {
            try {
                const data = await fs.readFile(`${__dirname}/public/views/index.html`);
                res.writeHead(200, { "Content-Type": "text/html; charset=urf-8" });
                return res.end(data);
            } catch (error) {
                console.error(error);
            }
            
        }
        else {
            console.log();
            try {
                const data = await fs.readFile(`${__dirname}/public${req.url}`);
                return res.end(data);
            } catch (error) {
                console.error(error);
            }
        }
    }

})

server.listen(3000);

server.on("listening", () => {
    console.log("connecting to http://localhost:3000");
})

server.on("error", (error) => {
    console.log(error);
})