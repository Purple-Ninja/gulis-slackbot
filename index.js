'use strict';

var Botkit = require('Botkit');
var request = require('request');

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var gulis = {
    // keyword search
    search: function(query, callback) {
        var options = {
            url: 'http://localhost:5000/beauty/search',
            qs: {
                push: 0,
                keyword: query
            }
        };
        request.get(options).on('data', function(data) {
            callback(null, data && JSON.parse(data) || {});
        }).on('error', function(err){
            callback(err, {});
        });
    }
};

var controller = Botkit.slackbot({ debug: false });

var ALL_EVENTS = ["ambient", "direct_mention", "mention", "direct_message"];
var API = {
    search: 'http://localhost:6172/beauty/search',
    logging: 'http://localhost:6172/beauty/logging',
    feedback: 'http://localhost:6172/beauty/feedback',
    trending: 'http://localhost:6172/beauty/trending'
};

var bot = controller.spawn({
  token: process.env.token
});

bot.startRTM(function(err) {
    if (err) {
        throw new Error(err);
    }
});

var messageHandler = function (bot, message) {

    gulis.search(message.text, function(err, data) {
        var msg;
        if (data.post && data.post.full_title && data.image && data.image.img_url) {
            msg = data.post.full_title + '\n' + data.image.img_url || '';
        }
        bot.reply(message, err || msg || "I'm dead.");
    });
};

controller.hears('', ALL_EVENTS, messageHandler);

