import React from 'react'
import '../styles/Sidebar.scss';
import { Form, Icon, Input } from 'antd';
import ArchiveChat from '../../../component/ArchiveChat';
import OnlinePerson from '../../../component/OnlinePerson';

export default function Sidebar({logout, user, online, activeChat, setActiveChat}) {
		return (
			<div className='sidebar'>
				<Form>
					<Form.Item>
						<Input className='search-field' prefix={<Icon type='search' />}
										placeholder='Поиск среди контактов'/>
					</Form.Item>
				</Form>				
				<hr/>
				<div className='now-online'>
					{online && online.map((el, index) => {
						if(el !== user){
							return <OnlinePerson key={index} user={el} setActiveChat={setActiveChat} />
						}
						return '';
					})}
				</div>
				<div className='chat-archive'>
					{user && user.chats.map((el, index) => <ArchiveChat key={index} chat={el} />)}
				</div>
			</div>
		)
}
