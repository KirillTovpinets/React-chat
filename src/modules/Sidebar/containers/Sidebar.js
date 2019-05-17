import React, { Component } from 'react'
import '../styles/Sidebar.scss';
import { Form, Icon, Input } from 'antd';
import ArchiveChat from '../../../component/ArchiveChat';

export default function Sidebar({logout, chats, user, activeChat, setActiveChat}) {
		return (
			<div className='sidebar'>
				<Form>
					<Form.Item>
						<Input className='search-field' prefix={<Icon type='search' />}
										placeholder='Поиск среди контактов'/>
					</Form.Item>
				</Form>				
				<hr/>
				<div className='chat-archive'>
					{chats.map((el, index) => <ArchiveChat key={index} chat={el} />)}
				</div>
			</div>
		)
}
