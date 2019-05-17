import React from 'react'
import Message from '../../../component/Message';
import { Form, Input, Button } from 'antd';
import '../styles/Chat.scss';
export default function Chat({chat}) {
	return (
		<div className="chat">
			{chat && 
				<div className="title">
					<h4>{chat.name}</h4>
					<span>{chat.status}</span>
				</div>
			}
			<div className="messages">
				{chat && chat.messages.map((el, index) => <Message
					avatar={el.sender.avatar}
					text={el.message}
					isReaded={true}
					isSend={true}
					key={index}
					date={el.create_at}
				/>)}
				{chat && chat.messages.length === 0 && <div className="no-messages"><span>Сообщений нет</span></div>}
			</div>
			<Form>
				<Form.Item>
					<Input type="text"/>
				</Form.Item>
				<Form.Item>
					<Button type="submit" type="primary">Отправить</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
