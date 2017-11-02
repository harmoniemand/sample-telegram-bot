const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '441575167:AAHYktBYfPrkrT4FC2EmjQBykTzGRQgnXPg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const pattern = require('./pattern.js');

function getValue(obj, path) {
    if (obj == null || path == null) {
        return null;
    }

    if (path.indexOf('.') > -1) {
        return getValue(obj[path.substring(0, path.indexOf('.'))], path.substring(path.indexOf('.') + 1));
    } else {
        return obj[path];
    }
};


bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    console.info(JSON.stringify(msg, null, 2));

    pattern.forEach(function (entry) {
        if ( (typeof(entry.pattern) == "string" && msg.text.indexOf(entry.pattern) > -1 ) || msg.text.match(entry.pattern)) {

            var responseText = entry.template;

            var variables = responseText.match(/\{\{[a-z,A-Z,\.,_]*\}\}/);

            if (variables != null) {
                variables.forEach(function(element) {
                    var path = element.replace(/\{/g, "").replace(/\}/g, "");
                    console.info(path);
                    var value = getValue(msg, path)
                    responseText = responseText.replace(element, value);
                }, this);
            }

            bot.sendMessage(chatId, responseText);
        }
    });
});