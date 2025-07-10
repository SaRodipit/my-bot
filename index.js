const TelegramBot = require('node-telegram-bot-api');

const token = '7600665438:AAHXDVepbk1QylzY9atnkqmkHXAGD5--TMY';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я бот для Октагона. Используй /help, чтобы узнать доступные команды.');
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `
📋 Доступные команды:
/start - Начать работу с ботом  
/help - Список всех команд  
/site - Получить ссылку на сайт Октагона  
/creator - Узнать создателя бота  
    `);
});

bot.onText(/\/site/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🌐 Официальный сайт Октагона: https://octagon-students.ru');
});

bot.onText(/\/creator/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '👨‍💻 Создатель бота: Баймеев Вячеслав');
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (!msg.text.startsWith('/')) { 
        bot.sendMessage(chatId, '❌ Я не понимаю это сообщение. Введи /help для списка команд)');
    }
});
