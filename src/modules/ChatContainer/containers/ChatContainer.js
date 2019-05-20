import React, { Component } from 'react'
import { MESSAGE_SENT, MESSAGE_RECIEVED, TYPING } from '../../../Events';
import Chat from '../components/Chat';
import Sidebar from '../../Sidebar';
import '../styles/Chat.scss';
export default class ChatContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null
		}
	}

	addChat = (chat, reset) => { 
		const { socket } = this.props;
		const { chats } = this.state;

		const newChats = reset ? [chat] : [...chats, chat];
		this.setState({
			chats: newChats,
			activeChat: reset ? chat : this.state.activeChat
		});
		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`;
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(typingEvent, this.updateTypingInChat(chat.id));
		socket.on(messageEvent, this.addMessageToChat(chat.id));
	}

	resetChat = (chat) => {
		return this.addChat(chat, true);
	}
	addMessageToChat(chatId){
		return message => {
			const { activeChat } = this.state;
			const { socket } = this.props;
			activeChat.chats.find(el => el.id === chatId).messages.push(message);

			const id = socket.user.id;
			socket.emit(MESSAGE_SENT, {chatId: id, message});
			this.setState({
				...this.state,
				activeChat
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
		const { peopleOnline } = this.props

		const active = peopleOnline.find(el => el.id === chat.id);
		
		const exist = active.chats.find(el => el.id === user.id);
		if (!exist) {
			active.chats.push({
				id: user.id,
				messages: []
			})
		}
		
		this.setState({
			...this.state,
			activeChat: active
		})
		const { socket } = this.props;
		const hash = user.id.concat(active.id).split('').sort().join('');
		const messageEvent = `${MESSAGE_RECIEVED}-${hash}`
		// const typingEvent = `${TYPING}-${active.id}`
		socket.on(messageEvent, this.addMessageToChat(user.id));
	}
	render() {
		const { user } = this.props.socket;
		const { peopleOnline } = this.props;
		return (
			<div className="container">
				<Sidebar
					logout={this.logout}
					user={user}
					online={peopleOnline}
					activeChat={this.state.activeChat}
					setActiveChat={this.setActiveChat.bind(this)}
				/>
				{user && <Chat company={this.state.activeChat}
							userid={user.id}
							send={this.sendMessage.bind(this)}/>}
			</div>
		)
	}
}
