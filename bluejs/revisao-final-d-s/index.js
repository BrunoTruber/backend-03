// const http = require("http");

// http.createServer((req, res) => {
//     res.send("Hello Wold, okkk");
//    }).listen(3000);

// console.log("ok");

const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send('Hello World Express');
});
 
app.listen(3000);