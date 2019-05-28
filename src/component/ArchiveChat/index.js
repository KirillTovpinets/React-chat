import React from 'react'
import './ArchiveChat.scss';
import isToday from 'date-fns/is_today';
import format from 'date-fns/format';
import className from 'classnames';

const getTime = (time) => {
	if(isToday(time)) {
		return format(time, 'HH:mm');
	} else {
		return format(time, 'DD:MM:YYYY')
	}
}
export default function ArchiveChat ({ chat, activeChat, setActiveChat }){
	const defaultAvatar = 'http://laurauinteriordesign.com/wp-content/uploads/2018/03/avatar-placeholder.png';
	const avatar = chat.sender.avatar ? ('data:image/jpeg;base64,' + chat.sender.avatar.file.originFileObj) : defaultAvatar;
	return (
		<div className={className('archive-chat', { 'active': activeChat && chat.id === activeChat.id })} onClick={() => setActiveChat(chat)}>
			<div className="avatar">
				<img src={avatar} alt={chat.sender.username}/>
			</div>
			<div className="content">
				<h4 className="name">{chat.sender.username}</h4>
				<p className="last-message">
				{chat.messages[chat.messages.length - 1] ? 
					chat.messages[chat.messages.length - 1].message :
					'Сообщений нет'}</p>
			</div>
			<div className="info">
				<span>{chat.messages[0] && getTime(chat.messages[0].time)}</span>
			</div>
		</div>
	)
}
