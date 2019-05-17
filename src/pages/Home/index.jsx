import React from 'react'
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../../Events';
import { ChatContainer } from '../../modules';
import './Home.scss';

const socketUrl = 'http://localhost:3001'
class Home extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			socket: null,
			user: null
		};
	}

	componentWillMount(){
		this.initSocket();
	}

	initSocket = () => {
		const socket = io(socketUrl)

		socket.on('connect', ()=> {
			console.log('Connected');
		})

		socket.on('connect_error', (err) => {
			console.log(err);
		})
		this.setState({
			...this.state,
			socket});
	}
	setUser = (user) => {
		const { socket } = this.state;
		socket.emit(USER_CONNECTED, user);
		this.setState({user});
	}
	logout = () => {
		const { socket } = this.state;
		socket.emit(LOGOUT);
		this.setState({
			...this.state,
			user: null
		})
	}
	render(){
		return (
			<section className='home'>
				<ChatContainer socket={this.state.socket} user={this.state.user}/>
			</section>
		)
	}
}

export default Home
