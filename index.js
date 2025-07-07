const TelegramBot = require('node-telegram-bot-api');

const token = '7600665438:AAHXDVepbk1QylzY9atnkqmkHXAGD5--TMY';

const bot = new TelegramBot(token, {polling: true});

bot.on('message' , (msg) => {
    console.log(msg)
    bot.sendMessage(msg.chat.id, '"Привет, октагон!”')
})