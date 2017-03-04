var Twit = require('twit');

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var screen_name='WestLinnWeather';

T.get('users/show', {screen_name: screen_name}, function(err,data,response){
    console.log(data);

    console.log('follow ' + data.id_str);
    var fs = T.stream('statuses/filter', {follow: data.id_str});
    //var fs = T.stream('statuses/filter', {track: 'recuse'});

    fs.on('connect', function(request){
        console.log('Listening on stream for ' + screen_name);
    });

    fs.on('tweet', function(msg) {
        console.log(msg);
    });
});


