import React from 'react'
import { LoginForm, RegisterForm } from '../../modules';
import { Route } from 'react-router-dom';
import './Auth.scss';


const Auth = () => (
	<section className='auth'>
		<div className="auth-content">
			<Route exact path={["/", "/login"]} component={LoginForm}/>
			<Route exact path="/register" render={() => <RegisterForm />}/>
		</div>
	</section>
)
export default Auth;
