import React from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';

const Button = ({ className, style, onClick, children }) => (
	<button className={className} style={{ position: 'relative', ...style }} onClick={onClick}>
		{ children }
		<Ink />
	</button>
);

Button.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired
};

Button.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default Button;
