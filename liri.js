require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var keys = require('./keys');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];

if (command === "my-tweets") {
    var params = {screen_name: 'anjiederp'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
          return(error);
      } else {
        for (var i = 0; i < 20; i++)
            console.log(tweets[i].text);
      }
    });
} else if (command === "spotify-this-song") {
    input = input || "Breaking The Habit";

    spotify.search({ type: 'track', query: input, limit: 1 }, function(error, data) {
        if (error) {
          console.log(error);
        } else { 
            var song = data.tracks.items[0];
            var name = song.name;
            var artist = song.artists[0].name;
            var preview = song.preview_url;
            var album = song.album.name;

            console.log("Artist: " + artist);
            console.log("Song Name: " + name);
            console.log("Preview Link: " + preview);
            console.log("Album Title: " + album);
        } 
      });
} else if (command === "movie-this") {
    input = input || "Mr. Nobody";
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
      if (error) {
          return (error);
        } else {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            //Some movies don't have a Rotten Tomatoes rating so this won't work all the time
            //I SWEAR IT WORKS!
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } 
    });
} else if (command === "do-what-it-says")
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
      console.log(data);
});



