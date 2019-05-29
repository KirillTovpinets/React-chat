const path = require('path');
const fs = require('fs');

var app = require('http').createServer((req, res) => {
	if (req.url === '/') {
		var filePath = path.join(__dirname, '../../build', 'index.html'); 
		var stream = fs.createReadStream(filePath);
		stream.pipe(res);
	}
});
var io = module.exports.io = require('socket.io')(app);
const PORT = process.env.PORT || 3001;
const socketManager = require('./SocketManager');

io.on('connection', socketManager);
app.listen(PORT, () => {
	console.log('Connect at port ' + PORT);
})