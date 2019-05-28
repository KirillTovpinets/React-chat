import React from 'react'
import Message from '../../../component/Message';
import { Form, Input, Button } from 'antd';
import '../styles/Chat.scss';

export default class Chat extends React.Component{
	handleSubmit(e){
		e.preventDefault();
		const { _message } = this.refs;
		this.props.send(this.props.company.id, _message.state.value);
		_message.state.value = '';
	}

	componentDidUpdate(){
		const container = document.getElementById('container');
		container.scrollTop = container.scrollHeight;
	}
	render(){
		const { company, userid } = this.props;
		const chat = company ? company.chats.find(el => el.id === userid) : null;
		return (
			<div className="chat">
				{company && 
					<div className="title">
						<h4>{company.username}</h4>
					</div>
				}
				<div className="messages">
					<div className="overflow-container" id="container">
						<div className="messages-layout">
							{chat && chat.messages.map((el, index) => <Message
								user={el.sender}
								text={el.message}
								isReaded={true}
								isSend={true}
								isMe={el.sender.id === userid}
								key={index}
								date={el.time}
							/>)}
						</div>
					</div>
					{chat && chat.messages.length === 0 && <div className="no-messages"><span>Сообщений нет</span></div>}
				</div>
				{chat && 
					<Form onSubmit={this.handleSubmit.bind(this)}>
					<Form.Item>
						<Input type="text" ref="_message"/>
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" type="primary">Отправить</Button>
					</Form.Item>
				</Form>}
			</div>
		)
	}
}
