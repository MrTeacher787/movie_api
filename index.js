const express = require("express");
const morgan = require("morgan");
const app = express();

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(morgan("common"));
app.use(express.static("public"));
app.use(myLogger);
app.use(requestTime);

const http = require("http"),
  url = require("url");

http
  .createServer((request, response) => {
    let requestURL = url.parse(request.url, true);
    if (requestURL.pathname == "/documentation.html") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Documentation on the martial arts movies API.\n");
    } else {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Welcome to my kickin' movie club!\n");
    }
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");

app.get("/movies", (req, res) => {
  let topMovies = [
    {
      title: "Enter the Dragon",
      director: "Robert Clouse",
      starring: "Bruce Lee",
    },
    {
      title: "The Big Boss",
      director: "Lo Wei, Wu Chia-Hsiang",
      starring: "Bruce Lee",
    },
    {
      title: "Rumble in the Bronx",
      director: "Stanley Tong",
      starring: "Jackie Chan",
    },
    {
      title: "Drunken Master",
      director: "Yuen Woo-ping",
      starring: "Jackie Chan",
    },
    { 
      title: "The One", 
      director: "James Wong", 
      starring: "Jet Li" 
    },
    { 
      title: "Ip-Man", 
      director: "Wilson Yip", 
      starring: "Donnie Yen" 
    },
    { 
      title: "Ong-Bak", 
      director: "Prachya Pinkaew", 
      starring: "Tony Jaa" 
    },
    {
      title: "Bloodsport",
      director: "Newt Arnold",
      starring: "Jean Claude Van Damme",
    },
    {
      title: "Kung Fu Hustle",
      director: "Stephen Chow",
      starring: "Stephen Chow",
    },
    {
      title: "Kung Pow! Enter the Fist",
      director: "Steve Oedekerk",
      starring: "Steve Oedekerk",
    },
  ];

  res.json(topMovies);
});

// GET requests
app.get("/", (req, res) => {
  let responseText = "Welcome to my app!";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

app.get("/secreturl", (req, res) => {
  let responseText = "This is a secret url with super top-secret content.";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Well, that\'s not supposed to happen!');
});

//listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
