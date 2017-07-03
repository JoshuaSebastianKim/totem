import React from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';

const Button = ({ className, style, disabled, onClick, children }) => (
	<button
		className={className}
		style={{ position: 'relative', ...style }}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
		{!disabled &&
			<Ink />
		}
	</button>
);

Button.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired
};

Button.defaultProps = {
	className: '',
	style: {},
	disabled: false,
	onClick: () => null
};

export default Button;
