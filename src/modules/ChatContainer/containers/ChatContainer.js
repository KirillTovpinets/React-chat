import React, { Component } from 'react'
import { MESSAGE_SENT, MESSAGE_RECIEVED, TYPING } from '../../../Events';
import Chat from '../components/Chat';
import Sidebar from '../../Sidebar';
import '../styles/Chat.scss';
export default class ChatContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null,
			chats: props.socket.user.chats
		}
	}

	componentWillReceiveProps(nextProps){
		const { socket, peopleOnline } = nextProps;
		const { user } = socket;

		if(peopleOnline.length > 0 && this.props.peopleOnline.length !== peopleOnline.length){
			console.log('hello');
			console.log(peopleOnline);
			let chats = [];
			peopleOnline.forEach(receiver => {
				const hash = user.id.concat(receiver.id).split('').sort().join('');
				const messageEvent = `${MESSAGE_RECIEVED}-${hash}`
				chats.push({
					id: receiver.id,
					sender: receiver,
					messages: []
				})
				// const typingEvent = `${TYPING}-${active.id}`
				socket.on(messageEvent, this.addMessageToChat(user.id, receiver.id));
			})
			this.setState({
				...this.state,
				chats
			})
		}
	}

	resetChat = (chat) => {
		return this.addChat(chat, true);
	}
	addMessageToChat(receiverId, senderId){
		return message => {
			const { activeChat, chats } = this.state;
			
			if (activeChat) {
				const newChat = chats.find(el => el.id === senderId);
				const active = activeChat.chats.find(el => el.id === receiverId);
				if( newChat.messages === active.messages) {
					active.messages.push(message);	
				} else {
					newChat.messages.push(message);
					active.messages.push(message);
				}
			} else {
				chats.find(el => el.id === senderId).messages.push(message);
			}

			this.setState({
				activeChat,
				chats
			})
		}
	}

	updateTypingInChat(chatId){
		return ({isTyping, user}) => {
			if(user !== this.props.user.name) {
				const { chats } = this.state;

				let newChats = chats.map((chat) => {
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						} else if (!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter( u => u !== user)
						}
					}
					return chat;
				})
				this.setState({chats: newChats })
			}
		}
	}
	sendMessage(chatId, message) {
		const { socket } = this.props;
		socket.emit(MESSAGE_SENT, {chatId, message});
	}

	sendTyping(chatId, isTyping){
		const { socket } = this.props;
		socket.emit(TYPING, {chatId, isTyping});
	}
	setActiveChat(chat){
		const { user } = this.props.socket;
		const { peopleOnline, socket } = this.props

		const userChat = this.state.chats.find(el => el.id === chat.id);
		let messages = [];

		if(userChat && userChat.messages.length > 0) {
			messages = userChat.messages;
		}
		const active = peopleOnline.find(el => el.id === chat.id);
		active.chats.push({
			id: user.id,
			messages
		})
		user.chats.push({
			id: active.id,
			messages
		})
		
		this.setState({
			...this.state,
			activeChat: active
		})
		// const hash = user.id.concat(active.id).split('').sort().join('');
		// const messageEvent = `${MESSAGE_RECIEVED}-${hash}`
		// // const typingEvent = `${TYPING}-${active.id}`
		// socket.on(messageEvent, this.addMessageToChat(user.id));
	}
	render() {
		const { user } = this.props.socket;
		const { chats, activeChat } = this.state;
		const { peopleOnline } = this.props;
		return (
			<div className="container">
				<Sidebar
					logout={this.logout}
					user={user}
					chats={chats.filter(el => el.messages.length > 0)}
					online={peopleOnline}
					activeChat={activeChat}
					setActiveChat={this.setActiveChat.bind(this)}
				/>
				{user && <Chat company={this.state.activeChat}
							userid={user.id}
							send={this.sendMessage.bind(this)}/>}
			</div>
		)
	}
}
