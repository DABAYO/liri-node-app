//set global info
require("dotenv").config();
const spotifyNode = require("node-spotify-api");
const twitterNode = require("twitter");
const request = require("request")
const fs = require("fs");
const arg2 = process.argv[2];
const arg3 = process.argv[3];
//keys required
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const omdbApi = "96675a9";
const queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=' + omdbApi;


switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    comply();
    break;
}

function myTweets(){

};

function spotifySong() {

};

function movie(){

};

function comply() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
});

