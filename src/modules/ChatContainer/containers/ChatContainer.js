import React, { Component } from 'react'
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, TYPING } from '../../../Events';
import Chat from '../components/Chat';
import Sidebar from '../../Sidebar';
import '../styles/Chat.scss';
export default class ChatContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chats: [],
			activeChat: null
		}
	}
	componentDidMount(){
		const { socket } = this.props
		socket.emit(COMMUNITY_CHAT, this.resetChat);
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
			const { chats } = this.state;
			let newChats = chats.map((chat) => {
				if(chat.id === chatId) {
					chat.messages.push(message);
				}
				return chat;
			})

			this.setState({
				...this.state,
				chats: newChats
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
	setActiveChat(activeChat){
		this.setState({
			...this.state,
			activeChat
		})
	}
	render() {
		return (
			<div className="container">
				<Sidebar
					logout={this.logout}
					chats={this.state.chats}
					user={this.props.user}
					activeChat={this.state.activeChat}
					setActiveChat={this.setActiveChat}
				/>
				<Chat chat={this.state.activeChat}/>
			</div>
		)
	}
}
