var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 3001;
const socketManager = require('./SocketManager');

io.on('connection', socketManager);

app.listen(PORT, () => {
	console.log('Connect at port ' + PORT);
})