const uuidv4 = require('uuid/v4');

const createUser = (data) => (
	{
		...data,
		id:uuidv4(),
		chats: []
	}
)

const createMessage = ({message='', sender=''} = { }) => (
	{
		id: uuidv4(),
		time: getTime(new Date(Date.now())),
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

const getTime = (date) => {
	return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
}

module.exports = {
	createMessage,
	createChat,
	createUser
}