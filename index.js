'use strict';

var botkit = require('botkit');
var request = require('request');

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var ALL_EVENTS = ["ambient", "direct_mention", "mention", "direct_message"];
var API = {
    search: 'http://localhost:6172/beauty/search',
    logging: 'http://localhost:6172/beauty/logging',
    feedback: 'http://localhost:6172/beauty/feedback',
    trending: 'http://localhost:6172/beauty/trending'
};

var controller = botkit.slackbot({ debug: false });

var bot = controller.spawn({
  token: process.env.token
});

bot.startRTM(function(err) {
    if (err) {
        throw new Error(err);
    }
});

var messageHandler = function (bot, message) {
    // search API options
    var options = {
        url: API.search,
        qs: {
            keyword: message.text,
            push: 50,
            type: '正妹',
            limit: 1
        }
    };

    // default response
    var messageText = 'http://i.imgur.com/rBarB0Z.jpg';

    request.get(options)
    .on('data', function(data) {
        var res = JSON.parse(data);
        messageText = res.suggestions[0].url;
    })
    .on('error', function(err) {
        console.log(err);
    }).on('end', function() {
        return bot.reply(message, messageText);
    });
};

controller.hears('', ALL_EVENTS, messageHandler);

