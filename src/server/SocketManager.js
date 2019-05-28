const io = require('./index.js').io;
const connectionString = process.env.DATABASE_URL || 'mongodb://localhost:27017/chat';
const db = require('monk')(connectionString);

const { VERIFY_USER, 
				USER_CONNECTED, 
				USER_DISCONNECTED, 
				LOGOUT,
				COMMUNITY_CHAT,
				MESSAGE_RECIEVED,
				REGISTER_USER,
				MESSAGE_SENT,
				TYPING } = require('../Events');

const { createUser, createMessage, createChat } = require('../Factories');

let connectedUsers = [];
let communityChat = createChat();

module.exports = function (socket) {
	console.log('Socket id: ' + socket.id);

	let sendMessagetoChatFromUser;
	let sendTypingFromUser;

	socket.on(VERIFY_USER, (user, callback) => {
		const users = db.get('users');
		users.find(user).then(el => {
			el.length === 0 ?
				callback(null) :
				callback(el.pop());
		});	
	})

	socket.on(USER_CONNECTED, (user, callback) => {
		connectedUsers = addUser(connectedUsers, user);
		sendMessagetoChatFromUser = sendMessageToChat(user);
		sendTypingFromUser = sendTypingToChat(user.name);
		io.emit(USER_CONNECTED, user);
		console.log(connectedUsers);
		callback(connectedUsers);
	})


	socket.on(REGISTER_USER, (user, callback) => {
		const users = db.get('users');
		console.log(user);
		const newUser = createUser(user);
		users.insert(newUser);
		const dbUser = users.find(newUser);
		callback(dbUser);
	})
	socket.on('disconnect', () => {
		if('user' in socket) {
			connectedUsers = removeUser(connectedUsers, socket.user);

			io.emit(USER_DISCONNECTED, connectedUsers);
			console.log('Disconnect', connectedUsers);
		}
	})

	socket.on(LOGOUT, () => {
		connectedUsers = removeUser(connectedUsers, socket.user);
		io.emit(USER_DISCONNECTED, connectedUsers);
		console.log('Disconnect', connectedUsers);
	})
	socket.on(COMMUNITY_CHAT, (callback) => {
		callback(communityChat);
	})

	socket.on(MESSAGE_SENT, ({chatId, message}) => {
		sendMessagetoChatFromUser(chatId, message);
	})
	socket.on(TYPING, ({chatId, isTyping}) => {
		sendTypingFromUser(chatId, isTyping);
	})
}

function sendTypingToChat(user) {
	return (chatId, isTyping) => {
		io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

function sendMessageToChat(sender) {
	return (chatId, message) => {
		const hash = sender.id.concat(chatId).split('').sort().join('');
		io.emit(`${MESSAGE_RECIEVED}-${hash}`, createMessage({message, sender}));
	}
}

function addUser(userList, user) {
	return userList.concat(user);
}

function removeUser(userList, user) {
	return userList.filter(el => el === user);
}
