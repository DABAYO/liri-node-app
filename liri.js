/set global info
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
// end of global info

// list of different options for argument2
switch (arg2) {
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
    doWhatItSays();
    break;
}

// console log my 20 latest tweets
function myTweets() {
  var params = {screen_name: 'chirpy_derby',count:20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("chirpy_derby's latest tweets:");
      for (let i = 0; i < tweets.length; i++){
        console.log(JSON.stringify(tweets[i].text, null, 2));
      }
    }
  });
}

// look up a song
function spotifySong() {
  if (!arg3) {
    console.log("Can't decide? How about this?")
    arg3 = "The Sign";
  };
  spotify.search({ type:'track', query: arg3, market:"us", limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
    console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
    console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
    console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
  });
}

//Look up a movie title
function movie() {
  if (!arg3) {
    arg3 = "Mr.Nobody";
  }
    request(queryUrl, function (err, response, body) {
        console.log(JSON.parse(body).Ratings.length);
        if (!err && response.statusCode === 200) {
              console.log(`${arg3} info:
              year: ${JSON.parse(body).Year}
              IMDB Rating: ${JSON.parse(body).imdbRating} 
              Country where produced: ${JSON.parse(body).Country} 
              Language: ${JSON.parse(body).Language} 
              Plot: ${JSON.parse(body).Plot} 
              Actors: ${JSON.parse(body).Actors}  `);

              let rotten = JSON.parse(body).Ratings;
              for (let i = 0; i < rotten.length; i++){
                  if (rotten[i].Source === "Rotten Tomatoes"){
                    console.log(`Rotten Tomatoes Rating: ${rotten[i].Value} `);
                  }
              }    
        }
    });
}

// read random.txt
function doWhatItSays() {

    fs.readFile('random.txt','utf8',  function(error, data) {
      if (error) {
        return console.log(error);
      }
      var dataArr = data.split(",");
  
      arg2 = dataArr[0].toString();
      arg3 = dataArr[1].toString();
    });
}