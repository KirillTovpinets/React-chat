import React, { Component, Fragment } from 'react'
import { Form, Icon, Input, Upload, message } from 'antd';
import { Button, Block } from '../../../component';
import { REGISTER_USER } from '../../../Events';
import { Link } from 'react-router-dom';
import '../styles/RegisterForm.scss';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avatar: null
		}
	}
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
	handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, avatar =>
        this.setState({
          avatar,
          loading: false,
        }),
      );
		}
	}
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const imageUrl = this.state.avatar;
		const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
		return (
			<Fragment>
				<div className="auth__top">
					<h2>Регистрация нового пользователя</h2>
					<p>Для входа в чат Вам нужно зарегистрироваться</p>
				</div>
				<Block>
					<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
						<Form.Item style={{display: 'flex', justifyItems: 'center'}}>
							{ getFieldDecorator('avatar', {})(<Upload
																									name="avatar"
																									listType="picture-card"
																									className="avatar-uploader"
																									showUploadList={false}
																									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
																									beforeUpload={beforeUpload}
																									onChange={this.handleChange}
																								>
																									{imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
																								</Upload>)}
						</Form.Item>
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
