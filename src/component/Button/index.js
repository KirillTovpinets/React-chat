import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import classNames from 'classnames';
import './Button.scss';

const ButtonComponent = (props) => {
	return (
		<Button {...props} className={classNames('button', props.className, {'button-large' : props.size === 'large'})}/>
	)
}

export default ButtonComponent;

ButtonComponent.propTypes = {
	className: PropTypes.string,

}