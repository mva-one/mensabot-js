var fs = require('fs');

// Read the JSON config file
try {
    const data = fs.readFileSync('./config.json', 'utf8');
    var config = JSON.parse(data);
} catch (err) {
    console.error(`Error reading file \'config.json\': ${err}`);
    process.exit(5);
}

console.log(config);