require("dotenv").config();

// nodes to use
const spotifyNode = require("node-spotify-api");
const twitterNode = require("twitter");
const request = require("request")
const fs = require("fs");

//keys required
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

//my-tweet code below displays 10 most recent tweets
const song = process.argv[2];
const movieName = process.argv[3];
const omdbApi = 96675a9;
const queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=' + omdbApi;


// spotify-this-song takes user input and displays song info

// movie-this '<movie name here>'


//do-what-it-says reads random.txt file and executes
fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
}
