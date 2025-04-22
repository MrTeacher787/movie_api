const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

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
app.use(bodyParser.json());
  
  // my top martial arts movies
  let topMovies = [
    {
      Title: "Enter the Dragon",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      },
      Director: {
        Name: "Robert Clouse",
        Bio: "Robert Clouse was an American film director and producer, known primarily for his work in the action/adventure and martial arts genres. He died on February 4, 1997, in Oregon of kidney failure. Clouse directed Bruce Lee in Lee's second English-speaking film starring role, 1973's Enter the Dragon.",
        Birth: "1928"
      },
      Starring: {
        Name: "Bruce Lee",
        Bio: "Bruce Lee was a Hong Kong-American actor, martial artist, and philosopher who helped make martial arts movies popular in the 1970s. Born Lee Jun-fan in San Francisco, he became a child actor in Hong Kong before returning to the US to teach martial arts. Lee is known for his roles in Enter the Dragon and The Chinese Connection. He's considered one of the most influential martial artists and a cultural icon.",
        Birth: "1940"
      },
      Year: "1973"
    },
    {
      Title: "The Big Boss",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      },
      Director: {
        Name: "Lo Wei, Wu Chia-Hsiang",
        Bio: "Lo Wei was a Hong Kong film director and actor best known for launching the martial arts film careers of both Bruce Lee, in The Big Boss and Fist of Fury, and Jackie Chan, in New Fist of Fury.",
        Birth: "1918"
      },
      Starring: {
        Name: "Bruce Lee",
        Bio: "Bruce Lee was a Hong Kong-American actor, martial artist, and philosopher who helped make martial arts movies popular in the 1970s. Born Lee Jun-fan in San Francisco, he became a child actor in Hong Kong before returning to the US to teach martial arts. Lee is known for his roles in Enter the Dragon and The Chinese Connection. He's considered one of the most influential martial artists and a cultural icon.",
        Birth: "1940"
      },
      Year: "1971"
    },
    {
      Title: "Rumble in the Bronx",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      },
      Director: {
        Name: "Stanley Tong",
        Bio: "Stanley Tong is a Hong Kong film director, producer, stunt choreographer, screenwriter, entrepreneur and philanthropist. He is known for directing action-adventure films, including several with Jackie Chan.",
        Birth: "1960"
      },
      Starring: {
        Name: "Jackie Chan",
        Bio: "Fang Shilong is a Hong Kong-born actor, stuntman, martial artist, and filmmaker. Chan has starred in action-packed films like The Karate Kid, Rumble in the Bronx, and Armour of God. He has stars on the Hollywood Walk of Fame and the Hong Kong SRA Avenue of Stars. Chan is also a UNICEF Goodwill Ambassador and philanthropist who advocates for conservation, disaster relief, and animal welfare.",
        Birth: "1954"
      },
      Year: "1995"
    },
    {
      Title: "Drunken Master",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      },
      Director: {
        Name: "Yuen Woo-ping",
        Bio: "Yuen Woo-ping is a Hong Kong martial arts choreographer and film director who worked in Hong Kong action cinema and later Hollywood films. He is one of the inductees on the Avenue of Stars in Hong Kong. Yuen is also a son of Yuen Siu-tien, a martial arts film actor.",
        Birth: "1945"
      },
      Starring: {
        Name: "Jackie Chan",
        Bio: "Fang Shilong is a Hong Kong-born actor, stuntman, martial artist, and filmmaker. Chan has starred in action-packed films like The Karate Kid, Rumble in the Bronx, and Armour of God. He has stars on the Hollywood Walk of Fame and the Hong Kong SRA Avenue of Stars. Chan is also a UNICEF Goodwill Ambassador and philanthropist who advocates for conservation, disaster relief, and animal welfare.",
        Birth: "1954"
      },
      Year: "1978"
    },
    { 
      Title: "The One",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      }, 
      Director: {
        Name: "James Wong",
        Bio: "James Wong is an American television and film director, screenwriter and producer. He is known for co-writing episodes of the Fox science fiction supernatural drama series The X-Files with his writing partner, Glen Morgan. Morgan and Wong are founders of the Hard Eight Pictures and co-created Space: Above and Beyond.",
        Birth: "1959"
      }, 
      Starring: {
        Name: "Jet Li",
        Bio: "\"Jet\" Li Lianjie is a Chinese-born Singaporean martial artist, actor, and philanthropist. After three years of training with acclaimed wushu teacher Wu Bin, Li won his first of five men's national championship for the Beijing Wushu Team in 1974.",
        Birth: "1963"
      },
      Year: "2001" 
    },
    { 
      Title: "Ip-Man",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      }, 
      Director: {
        Name: "Wilson Yip",
        Bio: "Wilson Yip Wai-Shun is a Hong Kong actor, filmmaker and screenwriter. His films include Bio Zombie, The White Dragon, SPL: Sha Po Lang, Dragon Tiger Gate, Flash Point and the Ip Man series.",
        Birth: "1964"
      }, 
      Starring: {
        Name: "Donnie Yen",
        Bio: "Donnie Yen Chi-tan is a Hong Kong actor, filmmaker, martial artist, and action director. He is the recipient of various accolades, including three Golden Horse Awards and five Hong Kong Film Awards.",
        Birth: "1963"
      },
      Year: "2008" 
    },
    { 
      Title: "Ong-Bak",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      }, 
      Director: {
        Name: "Prachya Pinkaew", 
        Bio: "Prachya Pinkaew is a Thai film director, film producer and screenwriter. His films include Ong-Bak: Muay Thai Warrior and Tom-Yum-Goong, both martial arts films starring Tony Jaa.",
        Birth: "1962"
      },
      Starring: {
        Name: "Tony Jaa",
        Bio: "Tatchakorn Yeerum, better known internationally as Tony Jaa and in Thailand as Jaa Phanom, is a Thai martial artist, actor, action choreographer, stuntman, and director.",
        Birth: "1976"
      },
      Year: "2003" 
    },
    {
      Title: "Bloodsport",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      },
      Director: {
        Name: "Newt Arnold",
        Bio: "Newt Arnold was an American film director, producer and screenwriter. Arnold directed Bloodsport, which was released in 1988 and has since become a cult film, as well as several other screen works.",
        Birth: "1922"
      },
      Starring: {
        Name: "Jean Claude Van Damme",
        Bio: "Jean-Claude Van Damme, born Jean-Claude Camille François Van Varenberg, is a Belgian actor and martial artist known for his action movies. His 1988 film Bloodsport cemented his status as a global action star. He followed it up with a string of successful films in the early 1990s, including Kickboxer, Cyborg, and Timecop. Van Damme's on-screen charisma and martial arts skills made him a favorite among action movie fans.",
        Birth: "1960"
      },
      Year: "1988"
    },
    {
      Title: "Kung Fu Hustle",
      Genre: {
        Name: "Action",
        Description: "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger."
      },
      Director: {
        Name: "Stephen Chow",
        Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
        Birth: "1962"
      },
      Starring: {
        Name: "Stephen Chow",
        Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
        Birth: "1962"
      },
      Year: "2004"
    },
    {
      Title: "Kung Pow! Enter the Fist",
      Genre: {
        Name: "Comedy",
        Description: "The comedy genre is defined by events that are intended to make someone laugh, no matter if the story is macabre, droll, or zany. Comedy can be found in most movies, but if the majority of the film is intended to be a comedy you may safely place it in this genre. The best comedy movies range throughout this entire spectrum of humor."
      },
      Director: {
        Name: "Steve Oedekerk",
        Bio: "Steven Brent Oedekerk is an American filmmaker, actor and stand-up comedian. He is best known for his collaborations with actor and comedian Jim Carrey and director Tom Shadyac, his series of \"Thumbmation\" shorts and his film Kung Pow!",
        Birth: "1961"
      },
      Starring: {
        Name: "Steve Oedekerk",
        Bio: "Steven Brent Oedekerk is an American filmmaker, actor and stand-up comedian. He is best known for his collaborations with actor and comedian Jim Carrey and director Tom Shadyac, his series of \"Thumbmation\" shorts and his film Kung Pow! ",
        Birth: "1961"
      },
      Year: "2002"
    },
  ];
  
// GET a list of '/movies'
app.get("/movies", (req, res) => {
  // send movie info array as JSON
  res.status(200).json(topMovies);
});

// GET '/movies' by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No such movie.')
  }
});

// GET '/movies' by genre
app.get("/movies/genre/:genreMain", (req, res) => {
  const { genreMain } = req.params;
  const movie = topMovies.find( movie => movie.Genre.Main === genreMain ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('No such genre.')
  }
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
