import React from 'react'
import './ArchiveChat.scss';
import isToday from 'date-fns/is_today';
import format from 'date-fns/format';

const getTime = (time) => {
	if(isToday(time)) {
		return format(time, 'HH:mm');
	} else {
		return format(time, 'DD:MM:YYYY')
	}
}
export default function ArchiveChat ({ chat }){
	return (
		<div className="archive-chat">
			<img src="https://source.unsplash.com/collection/190727/1600x900" alt={chat.name}/>
			<div className="content">
				<h4 className="name">{chat.name}</h4>
				<p className="last-message">
				{chat.messages[0] ? 
					chat.messages[0].slice(0, 50).concat('...') :
					'Сообщений нет'}</p>
			</div>
			<div className="info">
				<span>{chat.messages[0] && getTime(chat.messages[0].date)}</span>
			</div>
		</div>
	)
}
