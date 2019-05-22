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
			this.setState({
				...this.state,
				peopleOnline: this.state.peopleOnline.concat(newUser)
			})
		}) 
		let user = this.props.socket.user;

		if (!user) {
			user = JSON.parse(localStorage.getItem('user'));
		}
		socket.emit(USER_CONNECTED, user, this.setOnlineList.bind(this))
	}
	setOnlineList(peopleOnline){
		this.setState({
			...this.state,
			peopleOnline
		})
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
		const {socket} = this.props;
		return (
			<section className='home'>
				<ChatContainer socket={socket} peopleOnline={this.state.peopleOnline}/>
			</section>
		)
	}
}

export default Home
