import React from 'react'
import { LoginForm, RegisterForm } from '../../modules';
import { Route } from 'react-router-dom';
import './Auth.scss';

const Auth = ({socket}) => (
	<section className='auth'>
		<div className="auth-content">
			<Route exact path={["/", "/login"]} render={(props) => <LoginForm {...props} socket={socket} />}/>
			<Route exact path="/register" render={(props) => <RegisterForm {...props} socket={socket} />}/>
		</div>
	</section>
)
export default Auth;
