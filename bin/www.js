var app = require('../server')
var config = require('../config')

app.listen(config.WEB_PORT, '127.0.0.1', function(err) {
    if (err) {
        onError(err)
        return;
    }
    console.log('Listening at localhost:'+config.WEB_PORT);
});

// app.set('port', config.WEB_PORT);
// var server = http.createServer(app);
// server.listen(config.WEB_PORT);
// server.on('error', onError);
// server.on('listening', onListening);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
