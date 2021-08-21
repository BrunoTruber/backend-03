const http = require("http");

http.createServer((req, res) => {
    res.end("Hello Wold, okkk");
   }).listen(3000);
console.log("ok");