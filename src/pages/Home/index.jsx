import React from 'react'
import { USER_CONNECTED, LOGOUT } from '../../Events';
import { ChatContainer } from '../../modules';
import './Home.scss';

class Home extends React.Component {
	componentDidMount(){
		this.props.socket.emit(USER_CONNECTED, this.props.socket.user)
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
