import React, { Component } from 'react'
import './OnlinePerson.scss';
import isToday from 'date-fns/is_today';
import format from 'date-fns/format';

const getTime = (time) => {
	if(isToday(time)) {
		return format(time, 'HH:mm');
	} else {
		return format(time, 'DD:MM:YYYY')
	}
}
export default function OnlinePerson ({ user, setActiveChat }){
	return (
		<div className="archive-chat" onClick={() => setActiveChat(user)}>
			<img src="https://source.unsplash.com/collection/190727/1600x900" alt={user.username}/>
			<div className="content">
				<h4 className="name">{user.username}</h4>
			</div>
		</div>
	)
}
