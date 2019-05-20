const uuidv4 = require('uuid/v4');

const createUser = (data) => (
	{
		...data,
		id:uuidv4(),
		chats: []
	}
)

const createMessage = ({message='', sender={}} = { }) => (
	{
		id: uuidv4(),
		time: new Date(),
		message,
		sender
	}
)

const createChat = ({messages = [], name = 'Community', users = []} = {}) => (
	{
		id: uuidv4(),
		typingUsers: [],
		name,
		messages,
		users
	}
)

module.exports = {
	createMessage,
	createChat,
	createUser
}