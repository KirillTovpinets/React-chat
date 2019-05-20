import React, { Component, Fragment } from 'react'
import { Form, Icon, Input } from 'antd';
import { Button, Block } from '../../../component';
import { Link } from 'react-router-dom';
import { VERIFY_USER } from '../../../Events';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class LoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.socket.emit(VERIFY_USER, this.props.form.getFieldsValue(), this.checkLogin)
	}

	checkLogin = (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			this.props.socket.user = user;
			this.props.history.push('/im');
		} else {
			NotificationManager.error('Ошибка авторизации', 'Click me!', 5000);
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Fragment>
				<div className="auth__top">
					<h2>Войти в аккаунт</h2>
					<p>Пожалуйста, войдите в свой аккаунт</p>
				</div>
				<Block>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Form.Item hasFeedback>
						{ getFieldDecorator('username', {
							rules: [{required: true, message: 'Введите свой логин'}]
						})(<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
								size="large"
							/>)}
						</Form.Item>
						<Form.Item hasFeedback>
						{ getFieldDecorator('password',{
							rules: [{required: true, message: 'Введите свой пароль'}]
						})(<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
								size="large"
							/>)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button" size="large">
								Войти в аккаунт
							</Button>
						</Form.Item>
							<Link to="/register">Зарегистрироваться</Link>
					</Form>
				</Block>
				<NotificationContainer/>
			</Fragment>
		);
	}
}
const LoginFormWrapper = Form.create({ name: 'coordinated' })(LoginForm);

export default LoginFormWrapper;
