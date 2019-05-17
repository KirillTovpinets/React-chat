const io = require('./index.js').io;
const db = require('monk')('mongodb://localhost:27017/chat');

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

let connectedUsers = {};
let communityChat = createChat();

module.exports = function (socket) {
	console.log('Socket id: ' + socket.id);

	let sendMessagetoChatFromUser;
	let sendTypingFromUser;

	socket.on(VERIFY_USER, (user, callback) => {
		const users = db.get('users');
		console.log(user);
		users.find(user).then(el => {
			console.log(el);
			el.length === 0 ?
				callback(null) :
				callback(el.pop());
		});	
	})

	socket.on(USER_CONNECTED, (user) => {
		connectedUsers = addUser(connectedUsers, user);

		sendMessagetoChatFromUser = sendMessageToChat(user.name);
		sendTypingFromUser = sendTypingToChat(user.name);

		io.emit(USER_CONNECTED, connectedUsers);
		console.log(connectedUsers);
	})

	socket.on(REGISTER_USER, (user, callback) => {
		const users = db.get('users');
		const newUser = createUser(user);
		users.insert(newUser);
		const dbUser = users.find(newUser);
		callback(dbUser);
	})
	socket.on('disconnect', () => {
		if('user' in socket) {
			connectedUsers = removeUser(connectedUsers, socket.user.name);

			io.emit(USER_DISCONNECTED, connectedUsers);
			console.log('Disconnect', connectedUsers);
		}
	})

	socket.on(LOGOUT, () => {
		connectedUsers = removeUser(connectedUsers, socket.user.name);
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
		io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}));
	}
}

function addUser(userList, user) {
	let newList = Object.assign({}, userList);
	newList[user.username] = user
	return newList;
}

function removeUser(userList, username) {
	let newList = Object.assign({}, userList)
	delete newList[username];
	return newList;
}
