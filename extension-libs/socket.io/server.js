const http = require('http');
const config = require('config');
const express = require('express');

const HTTP_PORT = process.env.HTTP_PORT || config.get('port')

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server)

server.listen(HTTP_PORT, function () {
    console.info(`HTTP Server listening on port: ${HTTP_PORT}, in ${app.get('env')}`)
})

app.get('/', function (req, res) {
    console.log('welcome!')
    res.status(200);
})

io.on('connection', function (socket) {
    console.log('Connect successfully to the socket');
    socket.emit('news', {status: 'OK', data: ['111', '222', '333']})

    socket.on('success', (data) => {
        console.log(data)
    })
})