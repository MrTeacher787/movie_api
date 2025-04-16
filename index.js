const express = require("express");
const morgan = require("morgan");
const app = express();

// logs request info.
let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

// logs request time and date
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// use Morgan for HTTP requests
app.use(morgan("common"));

// use static files from the "public" directory
app.use(express.static("public"));
app.use(myLogger);
app.use(requestTime);

// define route for '/movies'
app.get("/movies", (req, res) => {
  
  // my top martial arts movies
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
  
  // send movie info array as JSON
  res.json(topMovies);
});

// GET requests
app.get("/", (req, res) => {
  let responseText = "Welcome to my kickin\' app!";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

app.get("/secreturl", (req, res) => {
  let responseText = "You were not supposed to find this secret url with super top-secret content. It's secret!";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Well, that\'s not supposed to happen!');
});

//listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
