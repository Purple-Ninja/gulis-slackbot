'use strict';

var Botkit = require('botkit');
// var Bot = require('slackbots');

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

// var settings = {
//     token: process.env.token,
//     name: 'BeautyBot'
// };

// var bot = new Bot(settings);

// bot.on('start', function() {
//     bot.postMessageToChannel('random', 'Hello channel!');
//     // bot.postMessageToUser('some-username', 'hello bro!');
//     // bot.postMessageToGroup('some-private-group', 'hello group chat!');
// });

var controller = Botkit.slackbot({ debug: false });

var bot = controller.spawn({
  token: process.env.token
});

bot.startRTM(function(err) {
    if (err) {
        throw new Error(err);
    }
});

// controller.on('message_received', function(bot, message) {
//     bot.reply(message, 'I heard... something!');
// });

controller.hears(['keyword'],['message_received'],function(bot,message) {

  // do something to respond to message
  bot.reply(message,'You used a keyword!');

});


// controller.spawn({
//     token: process.env.token
// });

// controller.on('hello', function(bot,message) {

//     // bot.
//     console.log('>>> bot:', bot);
//     console.log('>>> message:', message);

//     // if (message.type === 'user_typing') {
//     //     // do nothing
//     // } else {
//         // console.log('>>> message:', message);
//     bot.reply(message, "Hello");
//     // }
// });

// controller.hears(['(.*)'], ['direct_message','direct_mention','mention', 'message_received'], function(bot,message) {
//     console.log('>>> message:', message);
//     bot.reply(message, 'You saied '+message.text);
// });
