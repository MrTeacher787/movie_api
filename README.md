# movie_api Project (kickFlix)

## Overview:
### With this movie_api Project, we are creating the server-side aspect of a web application that allows users to search a wide array of information about martial arts movies such as actors, directors, their respective bios, genres, release dates, and even the movie posters. Furthermore, users will be able to create and manage their own account, and hand-pick a collection of movies to display in their favorites list. The MERN stack was used to build this API, following REST architecture principles to ensure a secure and efficient access to movie data stored in a non-relational database. This project shows skill in backend development, including proper managment of data, server frameworks, authentication, authorization, and data security.

## Project Objective:
### The main purpose of this project was to create the backend side of a web application that allows martial arts movie fans to access movies' data, create favorite lists, and their own profiles.

## Installation Requirements:
  - Node.js
  - MongoDB

## Features:
  - Returns a list of all movies in the database to the user
  - Returns movie details (description, genre, director, actor, image URL, release year, and whether it's featured or not) to the user when they search for a single movie title
  - Returns information on a genre (description) by name/title (e.g., "Action")
  - Returns data about a director (bio, birth year, death year) by name
  - Returns data about an actor (bio, birth year) by name
  - Allows users to register an account
  - Allows users to make changes to their account info. (username, password, email, date of birth, favorite movie)
  - Allows users to create a collection of their favorite movies
  - Allows users to remove a movie from their collection of favorites
  - Allows pre-existing users to deregister, or delete, their accounts

## Deployment:
  - Install dependencies using: npm install
  - Run the server using: npm start
  - Github link: https://github.com/MrTeacher787/movie_api

## Technical Stack:
  - Node.js: Server runtime environment
  - Express: Web framework for building RESTful APIs
  - MongoDB: Non-relational database for storing movie and user data
  - Mongoose: Object Data Modeling (ODM) library for MongoDB
  - Heroku
  - Postman (API endpoints testing)

## API Endpoints
  - **Movies**
    - HTTP Method: GET, Endpoint: /movies, Description: JSON object list of all movies
    - HTTP Method: GET, Endpoint: /movies/:Title, Description: JSON object of a single movie
    - HTTP Method: GET, Endpoint: /movies/genre/:genreName, Description: returns data about a genre by name
    - HTTP Method: GET, Endpoint: /movies/director/:directorName, Description: returns data about a director by name

  - **Users**
    - HTTP Method: GET, Endpoint: /users, Description: JSON object list of all users
    - HTTP Method: POST, Endpoint: /users, Description: registers a user and returns data with a JWT Token
    - HTTP Method: POST, Endpoint: /login, Description: takes users to login page to register
    - HTTP Method: PUT, Endpoint: /users/:username, Description: allows user to update their profile info
    - HTTP Method: GET, Endpoint: /users/:username, Description: gets info of single user by name
    - HTTP Method: POST, Endpoint: /users/:username/movies/:movieID, Description: adds a movie to favorites list
    - HTTP Method: DELETE, Endpoint: /users/:username/movies/:movieID, Description: removes a movie from favorites list
    - HTTP Method: DELETE, Endpoint: /users/:username, Description: allows pre-existing user to deregister

## Future Enhancements
  - Expand movie library
  - Allow users to rate movies
  - Add feature where users leave reviews on movies
