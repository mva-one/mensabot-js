var fs = require('fs');

// Read the JSON config file
try {
    const data = fs.readFileSync('./config.json', 'utf8');
    var config = JSON.parse(data);
} catch (err) {
    console.error(`Error reading file \'config.json\': ${err}`);
    process.exit(5);
}

// First bot test
const { Telegraf } = require('telegraf')

const bot = new Telegraf(config.bot_token)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('oldschool', (ctx) => ctx.reply('Hello'))

bot.use(async (ctx, next) => {
    console.time(`Processing update ${ctx.update.update_id}`)
    await next() // runs next middleware
    // runs after next middleware finishes
    console.timeEnd(`Processing update ${ctx.update.update_id}`)
});

function next () {
    console.log('THIS IS NEXTT!!!')
}


bot.launch()


console.log(config);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))