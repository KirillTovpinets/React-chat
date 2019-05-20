import React from 'react';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';
import { USER_CONNECTED } from './Events';

import { Auth, Home } from './pages';

const socketUrl = 'http://localhost:3001';
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			socket: null,
			user: null
		}
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
		socket.on(USER_CONNECTED, (list) => {
			console.log(list)
		})
		this.setState({
			...this.state,
			socket});
	}
	render(){
		return (
			<div className="App">
				<Route exact path={["/", "/login", "/register"]} render={(props) => <Auth {...props} socket={this.state.socket} />}/>
				<Route exact path='/im' render={(props) => <Home {...props} socket={this.state.socket} />}/>
			</div>
		);
	}
}

export default App;
