require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require('./keys');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {screen_name: 'anjiederp'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      return(error);
  } else { (process.argv[2] === "my-tweets") 
    for (var i = 0; i < tweets.length; i++)
    console.log(tweets[i].text);
  }
});

