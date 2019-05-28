import React from 'react'
import '../styles/Sidebar.scss';
import { Form, Icon, Input } from 'antd';
import ArchiveChat from '../../../component/ArchiveChat';
import OnlinePerson from '../../../component/OnlinePerson';

export default function Sidebar({logout, chats, user, online, activeChat, setActiveChat}) {
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
					<h4 className='title'>Сейчас онлайн</h4>
					<hr/>
					<div className="users-online">
						{online && user && online.map((el, index) => {
							if(el.id !== user.id){
								return <OnlinePerson key={index} user={el} setActiveChat={setActiveChat} />
							}
							return '';
						})}
						{online.length === 1 && <span className="is-empty">Список пуст</span>}
					</div>
				</div>
				<div className='chat-archive'>
					<h4 className='title'>Чаты</h4>
					<hr/>
					{chats && chats.map((el, index) => <ArchiveChat key={index} 
																													chat={el} 
																													setActiveChat={setActiveChat}
																													activeChat={activeChat} />)}
					{chats.length === 0 && <span className="is-empty">Список пуст</span>}
				</div>
			</div>
		)
}
