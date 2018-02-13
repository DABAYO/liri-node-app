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
    myTweets(arg1);
    break;

  case "spotify-this-song":
    spotifySong(arg3);
    break;

  case "movie-this":
    movie(arg3);
    break;

  case "do-what-it-says":
    comply(arg2);
    break;
}

function myTweets(){
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

};

function spotifySong() {
  spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
     // Do something with 'data' 
});
};

function movie(){
  request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log('Release Year: ' + JSON.parse(body).Year);
    }
  });
};

function comply() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
});

