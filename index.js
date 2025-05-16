const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.Users;
const Genres = Models.Genre;
const Directors = Models.Director;


mongoose.connect('mongodb://localhost:27017/kickFlixDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(bodyParser.json());
// use Morgan for HTTP requests
app.use(morgan("common"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// use static files from the "public" directory
app.use(express.static("public"));
app.use(myLogger);
app.use(requestTime);

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

//Users
let users = [
  {
    id: 1,
    username: "Larry",
    password: "Stooge1",
    email: "larrythestooge1@example.com",
    birthday: "1970-01-01",
    favoriteMovie: [],
  },
  {
    id: 2,
    username: "Moe",
    password: "Stooge2",
    email: "moethestooge2@example.com",
    birthday: "1970-12-25",
    favoriteMovie: ["Kung-Pow: Enter the Fist"],
  },
  {
    id: 3,
    username: "Curly",
    password: "Stooge3",
    email: "curlythestooge3@example.com",
    birthday: "1970-07-04",
    favoriteMovie: ["Drunken Master"],
  },
  {
    id: 4,
    username: "Bert",
    password: "Sesame1",
    email: "bertandernie1@example.com",
    birthday: "1982-10-18",
    favoriteMovie: ["Enter the Dragon"],
  },
  {
    id: 5,
    username: "Ernie",
    password: "Sesame2",
    email: "bertandernie2@example.com",
    birthday: "1982-07-14",
    favoriteMovie: ["Bloodsport"],
  },
];

// my top martial arts movies
let topMovies = [
  {
    id: 1,
    Title: "Enter the Dragon",
    Description:
      "A Shaolin martial artist travels to an island fortress to spy on an opium lord - who is also a former monk from his temple - under the guise of attending a fighting tournament.",
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 1,
      Name: "Robert Clouse",
      Bio: "Robert Clouse was an American film director and producer, known primarily for his work in the action/adventure and martial arts genres. He died on February 4, 1997, in Oregon of kidney failure. Clouse directed Bruce Lee in Lee's second English-speaking film starring role, 1973's Enter the Dragon.",
      Birth: "1928",
      Death: "1997",
    },
    Starring: {
      id: 1,
      Name: "Bruce Lee",
      Bio: "Bruce Lee was a Hong Kong-American actor, martial artist, and philosopher who helped make martial arts movies popular in the 1970s. Born Lee Jun-fan in San Francisco, he became a child actor in Hong Kong before returning to the US to teach martial arts. Lee is known for his roles in Enter the Dragon and The Chinese Connection. He's considered one of the most influential martial artists and a cultural icon.",
      Birth: "1940",
    },
    Year: "1973",
    ImageURL:
      "https://www.imdb.com/title/tt0070034/mediaviewer/rm638853120/?ref_=tt_ov_i",
    Featured: true,
  },
  {
    id: 2,
    Title: "The Big Boss",
    Description:
      "A young Chinese man sworn an oath of non-violence moves to Thailand to work with his cousins in an ice factory, which he discovers to be a front for a sinister heroin-smuggling operation.",
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 2,
      Name: "Lo Wei",
      Bio: "Lo Wei was a Hong Kong film director and actor best known for launching the martial arts film careers of both Bruce Lee, in The Big Boss and Fist of Fury, and Jackie Chan, in New Fist of Fury.",
      Birth: "1918",
      Death: "1996",
    },
    Starring: {
      id: 1,
      Name: "Bruce Lee",
      Bio: "Bruce Lee was a Hong Kong-American actor, martial artist, and philosopher who helped make martial arts movies popular in the 1970s. Born Lee Jun-fan in San Francisco, he became a child actor in Hong Kong before returning to the US to teach martial arts. Lee is known for his roles in Enter the Dragon and The Chinese Connection. He's considered one of the most influential martial artists and a cultural icon.",
      Birth: "1940",
    },
    Year: "1971",
    ImageURL: "https://www.imdb.com/title/tt0067824/mediaviewer/rm2200915969/",
    Featured: false,
  },
  {
    id: 3,
    Title: "Rumble in the Bronx",
    Description:
      "A young man visiting and helping his uncle in New York City finds himself forced to fight a street gang and the mob with his martial art skills.",
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 3,
      Name: "Stanley Tong",
      Bio: "Stanley Tong is a Hong Kong film director, producer, stunt choreographer, screenwriter, entrepreneur and philanthropist. He is known for directing action-adventure films, including several with Jackie Chan.",
      Birth: "1960",
      Death: "still alive",
    },
    Starring: {
      id: 2,
      Name: "Jackie Chan",
      Bio: "Fang Shilong is a Hong Kong-born actor, stuntman, martial artist, and filmmaker. Chan has starred in action-packed films like The Karate Kid, Rumble in the Bronx, and Armour of God. He has stars on the Hollywood Walk of Fame and the Hong Kong SRA Avenue of Stars. Chan is also a UNICEF Goodwill Ambassador and philanthropist who advocates for conservation, disaster relief, and animal welfare.",
      Birth: "1954",
    },
    Year: "1995",
    ImageURL:
      "https://www.imdb.com/title/tt0113326/mediaviewer/rm247021312/?ref_=tt_ov_i",
    Featured: false,
  },
  {
    id: 4,
    Title: "Drunken Master",
    Description:
      "Wong Fei-Hung is a mischievous, yet righteous young man, but after a series of incidents, his frustrated father has him disciplined by a master of drunken martial arts.",
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 4,
      Name: "Yuen Woo-ping",
      Bio: "Yuen Woo-ping is a Hong Kong martial arts choreographer and film director who worked in Hong Kong action cinema and later Hollywood films. He is one of the inductees on the Avenue of Stars in Hong Kong. Yuen is also a son of Yuen Siu-tien, a martial arts film actor.",
      Birth: "1945",
      Death: "still alive",
    },
    Starring: {
      id: 2,
      Name: "Jackie Chan",
      Bio: "Fang Shilong is a Hong Kong-born actor, stuntman, martial artist, and filmmaker. Chan has starred in action-packed films like The Karate Kid, Rumble in the Bronx, and Armour of God. He has stars on the Hollywood Walk of Fame and the Hong Kong SRA Avenue of Stars. Chan is also a UNICEF Goodwill Ambassador and philanthropist who advocates for conservation, disaster relief, and animal welfare.",
      Birth: "1954",
    },
    Year: "1978",
    ImageURL: "https://www.imdb.com/title/tt0080179/mediaviewer/rm1059532801/",
    Featured: false,
  },
  {
    id: 5,
    Title: "The One",
    Description:
      'A rogue Multiverse agent goes on a manhunt for alternate versions of himself, getting stronger with each kill. Only the last version of himself, an LASD cop, can stop his crusade before he becomes "The One".',
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 5,
      Name: "James Wong",
      Bio: "James Wong is an American television and film director, screenwriter and producer. He is known for co-writing episodes of the Fox science fiction supernatural drama series The X-Files with his writing partner, Glen Morgan. Morgan and Wong are founders of the Hard Eight Pictures and co-created Space: Above and Beyond.",
      Birth: "1959",
      Death: "still alive",
    },
    Starring: {
      id: 3,
      Name: "Jet Li",
      Bio: "\"Jet\" Li Lianjie is a Chinese-born Singaporean martial artist, actor, and philanthropist. After three years of training with acclaimed wushu teacher Wu Bin, Li won his first of five men\'s national championship for the Beijing Wushu Team in 1974.",
      Birth: "1963",
    },
    Year: "2001",
    ImageURL: "https://www.imdb.com/title/tt0267804/mediaviewer/rm1355569921/",
    Featured: false,
  },
  {
    id: 6,
    Title: "Ip-Man",
    Description:
      "During the Japanese invasion of China, a wealthy martial artist is forced to leave his home when his city is occupied. With little means of providing for themselves, Ip Man and the remaining members of the city must find a way to survive.",
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 6,
      Name: "Wilson Yip",
      Bio: "Wilson Yip Wai-Shun is a Hong Kong actor, filmmaker and screenwriter. His films include Bio Zombie, The White Dragon, SPL: Sha Po Lang, Dragon Tiger Gate, Flash Point and the Ip Man series.",
      Birth: "1964",
      Death: "still alive",
    },
    Starring: {
      id: 4,
      Name: "Donnie Yen",
      Bio: "Donnie Yen Chi-tan is a Hong Kong actor, filmmaker, martial artist, and action director. He is the recipient of various accolades, including three Golden Horse Awards and five Hong Kong Film Awards.",
      Birth: "1963",
    },
    Year: "2008",
    ImageURL:
      "https://www.imdb.com/title/tt1220719/mediaviewer/rm1332823040/?ref_=tt_ov_i",
    Featured: false,
  },
  {
    id: 7,
    Title: "Ong-Bak",
    Description:
      "When the head of a statue sacred to a village is stolen, a young martial artist goes to the big city and finds himself taking on the underworld to retrieve it.",
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 7,
      Name: "Prachya Pinkaew",
      Bio: "Prachya Pinkaew is a Thai film director, film producer and screenwriter. His films include Ong-Bak: Muay Thai Warrior and Tom-Yum-Goong, both martial arts films starring Tony Jaa.",
      Birth: "1962",
      Death: "still alive",
    },
    Starring: {
      id: 5,
      Name: "Tony Jaa",
      Bio: "Tatchakorn Yeerum, better known internationally as Tony Jaa and in Thailand as Jaa Phanom, is a Thai martial artist, actor, action choreographer, stuntman, and director.",
      Birth: "1976",
    },
    Year: "2003",
    ImageURL:
      "https://www.imdb.com/title/tt0368909/mediaviewer/rm2161200128/?ref_=tt_ov_i",
    Featured: false,
  },
  {
    id: 8,
    Title: "Bloodsport",
    Description:
      '"Bloodsport" follows Frank Dux, an American martial artist serving in the military, who decides to leave the army to compete in a martial arts tournament in Hong Kong where fights to the death can occur.',
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 8,
      Name: "Newt Arnold",
      Bio: "Newt Arnold was an American film director, producer and screenwriter. Arnold directed Bloodsport, which was released in 1988 and has since become a cult film, as well as several other screen works.",
      Birth: "1922",
      Death: "2000",
    },
    Starring: {
      id: 6,
      Name: "Jean Claude Van Damme",
      Bio: "Jean-Claude Van Damme, born Jean-Claude Camille François Van Varenberg, is a Belgian actor and martial artist known for his action movies. His 1988 film Bloodsport cemented his status as a global action star. He followed it up with a string of successful films in the early 1990s, including Kickboxer, Cyborg, and Timecop. Van Damme's on-screen charisma and martial arts skills made him a favorite among action movie fans.",
      Birth: "1960",
    },
    Year: "1988",
    ImageURL:
      "https://www.imdb.com/title/tt0092675/mediaviewer/rm934555904/?ref_=tt_ov_i",
    Featured: false,
  },
  {
    id: 9,
    Title: "Kung Fu Hustle",
    Description:
      'In Shanghai, China in the 1940s, a wannabe gangster aspires to join the notorious "Axe Gang" while residents of a housing complex exhibit extraordinary powers in defending their turf.',
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 9,
      Name: "Stephen Chow",
      Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
      Birth: "1962",
      Death: "still alive",
    },
    Starring: {
      id: 7,
      Name: "Stephen Chow",
      Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
      Birth: "1962",
    },
    Year: "2004",
    ImageURL: "https://www.imdb.com/title/tt0373074/mediaviewer/rm2223710208/",
    Featured: false,
  },
  {
    id: 10,
    Title: "Kung Pow! Enter the Fist",
    Description:
      "A rough-around-the-edges martial arts master seeks revenge for his parents' death.",
    Genre: {
      id: 2,
      Name: "Comedy",
      Description:
        "The comedy genre is defined by events that are intended to make someone laugh, no matter if the story is macabre, droll, or zany. Comedy can be found in most movies, but if the majority of the film is intended to be a comedy you may safely place it in this genre. The best comedy movies range throughout this entire spectrum of humor.",
    },
    Director: {
      id: 10,
      Name: "Steve Oedekerk",
      Bio: 'Steven Brent Oedekerk is an American filmmaker, actor and stand-up comedian. He is best known for his collaborations with actor and comedian Jim Carrey and director Tom Shadyac, his series of "Thumbmation" shorts and his film Kung Pow!',
      Birth: "1961",
      Death: "still alive",
    },
    Starring: {
      id: 8,
      Name: "Steve Oedekerk",
      Bio: 'Steven Brent Oedekerk is an American filmmaker, actor and stand-up comedian. He is best known for his collaborations with actor and comedian Jim Carrey and director Tom Shadyac, his series of "Thumbmation" shorts and his film Kung Pow! ',
      Birth: "1961",
    },
    Year: "2002",
    ImageURL:
      "https://www.imdb.com/title/tt0240468/mediaviewer/rm3057194752/?ref_=tt_ov_i",
    Featured: false,
  },
  {
    id: 11,
    Title: "Kung Fu Panda",
    Description:
    "To everyone\'s surprise, including his own, Po, an overweight, clumsy panda, is chosen as protector of the Valley of Peace. His suitability will soon be tested as the valley\'s arch-enemy is on his way.", 
    Genre: {
      id: 3,
      Name: "Animated",
      Description:
        "The animation genre is defined by inanimate objects being manipulated to appear as though they are living. This can be done in many different ways and can incorporate any other genre and sub-genre.",
    },
    Director: {
      id: 11,
      Name: "Mark Osborne",
      Bio: "Mark Randolph Osborne is an American film director, writer, producer and animator from Trenton, New Jersey who is known for co-directing the Oscar nominated Kung Fu Panda (2008) and The SpongeBob SquarePants Movie (2004) (the live-action sequences), as well as directing The Little Prince (2015) himself.",
      Birth: "1970",
      Death: "still alive",
    },
    Starring: {
      id: 9,
      Name: "Jack Black",
      Bio: "Thomas Jacob \"Jack\" Black was born on August 28, 1969 in Santa Monica, California and raised in Hermosa Beach, California to Judith Love Cohen and Thomas William Black, both satellite engineers. Although he was just a background voice in his first film, Jack's appearances in such television shows as The X-Files (1993), his breakthrough performance in High Fidelity (2000) and his rock-comedy band, Tenacious D have created an ever-growing cult following.",
      Birth: "1969",
    },
    Year: "2008",
    ImageURL:
      "https://www.imdb.com/title/tt0441773/mediaviewer/rm3096332288/?ref_=tt_ov_i",
    Featured: false,
  },
  {
    id: 12,
    Title: "Shaolin Soccer",
    Description:
      "A young Shaolin follower reunites with his discouraged brothers to form a soccer team using their martial art skills to their advantage.",
    Genre: {
      id: 1,
      Name: "Action",
      Description:
        "Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
    },
    Director: {
      id: 9,
      Name: "Stephen Chow",
      Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
      Birth: "1962",
      Death: "still alive",
    },
    Starring: {
      id: 7,
      Name: "Stephen Chow",
      Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
      Birth: "1962",
    },
    Year: "2001",
    ImageURL: "https://www.imdb.com/title/tt0286112/mediaviewer/rm383716353/?ref_=tt_ov_i",
    Featured: false,
  },
  {
    id: 13,
    Title: "From Beijing with Love",
    Description:
      "A Chinese spy who's been out of service for ten years whilst making a living as a butcher is sent to Hong Kong to locate a stolen Tyrannosaurus rex skull.",
    Genre: {
      id: 4,
      Name: "Parody",
      Description:
        "A parody mocks and specifically targets a single piece of art or connected body of work. A parody is more precise, and more limited.",
    },
    Director: {
      id: 9,
      Name: "Stephen Chow",
      Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
      Birth: "1962",
      Death: "still alive",
    },
    Starring: {
      id: 7,
      Name: "Stephen Chow",
      Bio: "Stephen Chow Sing-chi is a Hong Kong filmmaker and former actor, known for his mo lei tau comedy. His career began in television, where he gained recognition through variety shows and TV dramas.",
      Birth: "1962",
    },
    Year: "1994",
    ImageURL: "https://www.imdb.com/title/tt0109962/mediaviewer/rm1730228993/",
    Featured: false,
  },
];

//Add a user
/* We'll expect JSON in this format:
{
   ID: Integer,
   Username: String,
   Password: String,
   Email: String,
   Birthday: Date
}*/
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//UPDATE (PUT a new username)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("That user is not here!");
  }
});

//CREATE (POST a new movie)
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovie.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
  } else {
    res.status(400).send("That user is not here!");
  }
});

//DELETE (DELETE a movie)
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovie = user.favoriteMovie.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array.`);
  } else {
    res.status(400).send("That user is not here!");
  }
});

//DELETE (DELETE a user)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted.`);
  } else {
    res.status(400).send("That user is not here!");
  }
});

// READ (GET a list of '/movies')
app.get("/movies", (req, res) => {
  // send movie info array as JSON
  res.status(200).json(topMovies);
});

// READ (GET '/movies' by title)
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie.");
  }
});

//READ (GET genre info)
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = topMovies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("No such genre.");
  }
});

//READ (GET director info)
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = topMovies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such director.");
  }
});

// GET requests
app.get("/", (req, res) => {
  let responseText = "Welcome to my kickin' app!";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

app.get("/secreturl", (req, res) => {
  let responseText =
    "You were not supposed to find this secret url with super top-secret content. It's secret!";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Well, that's not supposed to happen!");
});

//listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
