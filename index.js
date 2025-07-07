const TelegramBot = require('node-telegram-bot-api');

const token = '7600665438:AAHXDVepbk1QylzY9atnkqmkHXAGD5--TMY';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        bot.sendMessage(chatId, 'Привет! Я бот для Октагона. Используй /help, чтобы узнать доступные команды.');
    } 
    else if (text === '/help') {
        bot.sendMessage(chatId, 'Доступные команды:\n/start - Начать работу\n/help - Список команд\n/site - Ссылка на сайт\n/creator - Информация о создателе');
    }
    else if (text === '/site') {
        bot.sendMessage(chatId, 'Официальный сайт: https://octagon-students.ru');
    }
    else if (text === '/creator') {
        bot.sendMessage(chatId, 'Этот бот создан: Баймеевым Вячеславом.');
    }
    else {
        bot.sendMessage(chatId, 'Я не понимаю эту команду. Введи /help для списка доступных команд.');
    }
});
