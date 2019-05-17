import React from 'react'
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import classNames from 'classnames';
import checkedSvg from '../../assets/img/checked.svg';

import './Message.scss';
export default function Message({ avatar, user, isMe, text, date, isSend, isReaded }) {
	return (
		<div className={classNames('message', {'message--isMe': isMe, 'is-readed': isReaded})}>
			<div className="message__avatar">
				<img src={avatar} alt={`Avatar ${user.fullname}`}/>
			</div>
			<div className="message__content">
				{ isSend && <img src={checkedSvg} alt="checked icon" /> }
				<div className="message__info">
					<div className="message__bubble">
						<p className="message__text">{text}</p>
					</div>
					<span className="message__date">
						{distanceInWordsToNow(date, { addSuffix: true, locale: ruLocale})}
					</span>
				</div>
			</div>
		</div>
	)
}

Message.defaultProps = {
	user: {}
}
Message.protoTypes = {
	avatar: PropTypes.string,
	user: PropTypes.object,
	message: PropTypes.string,
	date: PropTypes.string
}