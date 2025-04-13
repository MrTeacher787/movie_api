const express = require("express");
const app = express();
const http = require("http"),
  url = require("url");

http
  .createServer((request, response) => {
    let requestURL = url.parse(request.url, ture);
    if (requestURL.pathname == "/documentation.html") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Documentation on the martial arts movies API.\n");
    } else {
      response.writeHead(200, { "Content-Type": "text/plain" });
    }
  })
  .listen(8080);

console.log("My first Node test server is running on port 8080.");
