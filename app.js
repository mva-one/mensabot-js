var fs = require('fs');
require('console-stamp')(console, 'HH:MM:ss');

// Read the JSON config file
try {
    const data = fs.readFileSync('./config.json', 'utf8');
    var config = JSON.parse(data);
} catch (err) {
    console.error(`Error reading file \'config.json\': ${err}`);
    process.exit(5);
}

// First bot test
const { Markup, Telegraf } = require('telegraf')

const bot = new Telegraf(config.bot_token)

bot.use(async (ctx, next) => {
    console.time(`Processing update ${ctx.update.update_id}`)
    await next() // runs next middleware
    // runs after next middleware finishes
    console.timeEnd(`Processing update ${ctx.update.update_id}`)
});

async function next() {
    console.log('THIS IS NEXTT!!!')
}


function currentYearAndWeekNumber() {
    var date = new Date();
    var currentThursday = new Date(date.getTime() + (3 - ((date.getDay() + 6) % 7)) * 86400000);
    var yearOfThursday = currentThursday.getFullYear();
    var firstThursday = new Date(new Date(yearOfThursday, 0, 4).getTime() + (3 - ((new Date(yearOfThursday, 0, 4).getDay() + 6) % 7)) * 86400000);
    return date.getFullYear() + '/' + Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000 / 7);
}


const mensa_keyboard = Markup.keyboard(['Heide', 'Weinberg', 'Harz', 'Francke', 'Alle 4'], { columns: 2 })

bot.start((ctx) => {
    return ctx.reply('Wähle die Mensa, um das Menü anzuzeigen.', mensa_keyboard)
})

bot.hears('Heide', (ctx) => {
    fetch(config.api_url + currentYearAndWeekNumber())
    .then(
        console.log(response)
    )
    .catch()
    return ctx.reply('Heidemenu')
        /* .then((response) => {
            // Do something with response
            return ctx.reply('Menue' + response.9.dates.2022-06-07.3.name)
        })
        .catch(function (err) {
            console.error("Unable to fetch -", err);
            return ctx.reply('ERROR Menue fuer Heide')
        })    */ 
})




bot.launch()


console.log("---- BOT LAUNCHED ----   Let's go! Current week number is: " + currentYearAndWeekNumber());

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))