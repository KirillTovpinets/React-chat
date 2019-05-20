import React from 'react'
import './OnlinePerson.scss';

export default function OnlinePerson ({ user, setActiveChat }){
	const defaultAvatar = 'http://laurauinteriordesign.com/wp-content/uploads/2018/03/avatar-placeholder.png';
	const avatar = user.avatar ? ('data:image/jpeg;base64,' + user.avatar.file.originFileObj) : defaultAvatar;
	return (
		<div className="archive-chat" onClick={() => setActiveChat(user)}>
			<img src={avatar} alt={user.username}/>
			<div className="content">
				<h4 className="name">{user.username}</h4>
			</div>
		</div>
	)
}
