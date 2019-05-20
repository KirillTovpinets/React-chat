import React from 'react'
import { USER_CONNECTED, LOGOUT } from '../../Events';
import { ChatContainer } from '../../modules';
import './Home.scss';

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			peopleOnline: [],
			user: null
		}
	}
	componentWillUnmount(){
		const {socket} = this.props;
		socket.emit(LOGOUT);
	}
	componentDidMount(){
		const {socket} = this.props;
		socket.on(USER_CONNECTED, (newUser) => {
			socket.connectedUsers = socket.connectedUsers ? socket.connectedUsers.concat(newUser) : [newUser];
			this.forceUpdate();
		}) 
		let user = this.props.socket.user;

		if (!user) {
			user = JSON.parse(localStorage.getItem('user'));
		}
		this.props.socket.emit(USER_CONNECTED, user, this.setOnlineList.bind(this))
	}
	setOnlineList(peopleOnline){
		this.props.socket.connectedUsers = peopleOnline;
		this.forceUpdate();
	}
	logout = () => {
		const { socket } = this.props;
		socket.emit(LOGOUT);
		this.setState({
			...this.state,
			user: null
		})
	}
	render(){
		return (
			<section className='home'>
				<ChatContainer socket={this.props.socket}/>
			</section>
		)
	}
}

export default Home
