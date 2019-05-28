import React from 'react'
import '../ArchiveChat/ArchiveChat.scss';

export default function OnlinePerson ({ user, setActiveChat }){
	const defaultAvatar = 'http://laurauinteriordesign.com/wp-content/uploads/2018/03/avatar-placeholder.png';
	const avatar = user.avatar ? ('data:image/jpeg;base64,' + user.avatar.file.originFileObj) : defaultAvatar;
	return (
		<div className="user">
			<div className="avatar">
				<img src={avatar} alt={user.username}/>
			</div>
			<a href="#" onClick={() => setActiveChat(user)}>{user.username}</a>
		</div>
	)
}
