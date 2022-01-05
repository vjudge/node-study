const config = require('config')
const http = require('http')
const sequelize = require('./sequelize')
const app = require('./express')

const HTTP_PORT = process.env.HTTP_PORT || config.get('port');

init();

async function init () {
    await initDB();

    http.createServer(app).listen(HTTP_PORT, function () {
        console.info(`HTTP Server listening on port: ${HTTP_PORT}, in ${app.get('env')}`);
    })
}

async function initDB () {
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (err) {
        console.error(err);
        console.log('Database connect is failed!');
        process.exit(1);
    }
}