const TelegramBot = require('node-telegram-bot-api');

const token = '';

const bot = new TelegramBot(token, {polling: true});

bot.on('message' , (msg) => {
    console.log(msg)
    bot.sendMessage(msg.chat.id, '"Привет, октагон!”')
})
