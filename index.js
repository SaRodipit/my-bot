const TelegramBot = require('node-telegram-bot-api');
const db = require('./db'); 

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
/randomItem - Получить случайный предмет из БД  
/getItemByID {id} - Получить предмет по ID  
/deleteItem {id} - Удалить предмет по ID
   `);
});

// /site
bot.onText(/\/site/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🌐 Официальный сайт Октагона: https://octagon-students.ru');
});

// /creator
bot.onText(/\/creator/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '👨‍💻 Создатель бота: Баймеев Вячеслав');
});

// /randomItem
bot.onText(/\/randomItem/, (msg) => {
    const chatId = msg.chat.id;

    db.query('SELECT * FROM items ORDER BY RAND() LIMIT 1', (err, results) => {
        if (err || results.length === 0) {
            bot.sendMessage(chatId, '❌ Ошибка при получении предмета.');
        } else {
            const item = results[0];
            bot.sendMessage(chatId, `(${item.id}) - ${item.name}: ${item.desc}`);
        }
    });
});

// /getItemByID 3
bot.onText(/\/getItemByID (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const id = parseInt(match[1]);

    db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) {
            bot.sendMessage(chatId, '❌ Предмет с таким ID не найден.');
        } else {
            const item = results[0];
            bot.sendMessage(chatId, ` (${item.id}) - ${item.name}: ${item.desc} `);
        }
    });
});

// /deleteItem 2
bot.onText(/\/deleteItem (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const id = parseInt(match[1]);

    db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
        if (err) {
            bot.sendMessage(chatId, '❌ Ошибка при удалении.');
        } else if (result.affectedRows > 0) {
            bot.sendMessage(chatId, '✅ Удачно удалено.');
        } else {
            bot.sendMessage(chatId, '❌ Ошибка: предмет с таким ID не найден.');
        }
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(chatId, '❌ Я не понимаю это сообщение. Введи /help для списка команд.');
    }
});