// set global info
require("dotenv").config();
const spotifyReq = require("node-spotify-api");
const twitterReq = require("twitter");
const request = require("request");
const fs = require("fs");
const arg2 = process.argv[2];
const arg3 = process.argv[3];
// keys required
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
console.log(spotify);
const omdbApi = "96675a9"
const queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=' + omdbApi;

// options for arg2
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
        doWhatItSays();
        break;
}

function myTweets() {
    var params = {screen_name: 'chirpy_derby', count:20};
    client.get('statuses/user_timeline',params, function (error,tweets, response) {
        for (let i=0; i <tweets.length; i++){
            console.log(JSON.stringify(tweets[i].text, null, 2));
        }
    });
}

function spotifySong() {
    if(!arg3) {
    console.log("Can't decide? How about this? ") 
    arg3 = "The Sign";
    };
    spotify.search({ type: 'track', query: arg3, limit: 1}, function(error, data) {
        if (error) {
            return console.log('Error: ' + error);
        }
        console.log(JSON.stringify (data.tracks.items[0].artists[0].name, null, 2));
        console.log(JSON.stringify (data.tracks.items[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].external_urs.spotify, null, 2));
        console.log(JSON.stringfy(data.tracks.items[0].album.name, null, 2));
    });
}

function movie() {
    if (!arg3) {
        arg3 = "Mr. Nobody";
    }
    request(queryUrl, function(error, response, body) {
        console.log(JSON.parse(body).ratings.length);
        if (!error && response.statusCode ===200) {
            console.log(`${arg3} Movie info:
            Year: ${JSON.parse(body).Year}
            IMDB Rating: ${JSON.parse(body).imdbRating}
            Country where produced: ${JSON.parse(body).Country}
            Language: ${JSON.parse(body).Language}
            Plot: ${JSON.parse(body).Plot}
            Actors: ${JSON.parse(body).Actors}`);
            
            let rotTom = JSON.parse(body).Ratings;
            for (let i= 0; i < rotTom.length; i++){
                if (rotTom[i].Source === "Rotten Tomatoes"){
                    consol.log(`Rotten Tomatoes Rating: ${rotTom[i].Value}`);
                }
            }
        }
    });
}

// read random text
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        }
        var dataArr = data.split(",");

        arg2 = dataArr[0].toString();
        arg3 = dataArr[1].toString();
    })
}
