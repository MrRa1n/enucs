const request = require('request');
const token = require('../config/bearerToken');

const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=enucs&exclude_replies=true&include_rts=false';

exports.getTweets = () => request(url, { 'auth': {'bearer': token.bearerToken}}, (err, res, body) => {
    let data = JSON.parse(body);
    data.forEach(tweet => {
        console.log(tweet.text + ' - ' + tweet.created_at);
    });
});

module.exports = exports;