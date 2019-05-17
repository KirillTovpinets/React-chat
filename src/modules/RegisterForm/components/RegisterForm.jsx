import React, { Component, Fragment } from 'react'
import { Form, Icon, Input } from 'antd';
import { Button, Block } from '../../../component';
import { REGISTER_USER } from '../../../Events';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
	handleSubmit(e){
		e.preventDefault();
		this.props.socket.emit(REGISTER_USER, this.props.form.getFieldsValue(), this.checkRegistration.bind(this))
	}

	checkRegistration(user){
		if(user){
			this.props.socket.user = user;
			document.location.href = '/login';
		}
	}
	compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Fragment>
				<div className="auth__top">
					<h2>Регистрация нового пользователя</h2>
					<p>Для входа в чат Вам нужно зарегистрироваться</p>
				</div>
				<Block>
					<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
						<Form.Item hasFeedback>
							{ getFieldDecorator('username', {
								rules: [{ required: true, message: 'Введите свой логин'}]
							})(<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Username"
									size="large"
								/>)}
						</Form.Item>
						<Form.Item hasFeedback>
							{ getFieldDecorator('password', {
								rules: [{ required: true, message: 'Введите свой пароль'}]
							})(<Input
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="Password"
									size="large"
								/>)}
						</Form.Item>
						<Form.Item hasFeedback>
							{ getFieldDecorator('repeat-password', {
									rules: [{ required: true, message: 'Пароли не совпадают', validator: this.compareToFirstPassword }]
								})(<Input
											prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="password"
											placeholder="Repeate password"
											size="large"
										/>)}
						</Form.Item>
						<Form.Item hasFeedback>
							{ getFieldDecorator('name', {
									rules: [{ required: true, message: 'Введите своё имя'}]
								})(<Input
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="text"
											placeholder="Enter you name"
											size="large"
										/>)}
						</Form.Item>
						<Form.Item hasFeedback>
							{ getFieldDecorator('surname', {
									rules: [{ required: true, message: 'Введите свою фамилию'}]
								})(<Input
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="Enter your surname"
											size="large"
										/>)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button" size="large">
								Отправить
							</Button>
						</Form.Item>
							<Link to="/"> Авторизоваться</Link>
					</Form>
				</Block>
			</Fragment>
		);
	}
}
const RegisterFormWrapper = Form.create({ name: 'coordinated' })(RegisterForm);

export default RegisterFormWrapper;
