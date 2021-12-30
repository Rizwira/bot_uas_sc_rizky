var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5002726685:AAHEjvJwJdfjPImumA1GfCPHoeu3mCMbbas'
const bot = new TelegramBot(token, {polling: true});


// main menu bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome to bot_SC_Rizky\n
        click /predict`
    );   
});

// input requires i and r
state = 0;
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `masukan nilai y1|y2|y3 contoh 9|9|9`
    );   
    state = 1;
});

bot.on('message', (msg) => {
    if(state == 1){
        s = msg.text.split("| |");
        y1 = s[0]
        y2 = s[1]
        y3 = s[2]
        model.predict(
            [
                parseFloat(s[0]), // string to Float
                parseFloat(s[1]),
                parseFloat(s[2])
            ]
        ).then((jres)=>{
            bot.sendMessage(
                msg.chat.id,
                `nilai y1 yang diprediksi adalah ${jres[0]} y1` 
           );
            bot.sendMessage(
                msg.chat.id,
                `nilai y2 yang diprediksi adalah ${jres[1]} y2`
           );
            bot.sendMessage(
                msg.chat.id,
                `nilai y3 yang diprediksi adalah ${jres[2]} y3`
           );
       })
    }else{
        state = 0 
    }
})

// routers
r.get('/prediction/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.x1), // string to float
            parseFloat(req.params.x2),
            parseFloat(req.params.x3)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
