const handleRequest = (req, res) => {
	if (req.url === '/') {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	}
}


var app = require('http').createServer(handleRequest);
var io = module.exports.io = require('socket.io')(app);
const path = require('path');

const PORT = process.env.PORT || 3001;
const socketManager = require('./SocketManager');

io.on('connection', socketManager);
app.listen(PORT, () => {
	console.log('Connect at port ' + PORT);
})