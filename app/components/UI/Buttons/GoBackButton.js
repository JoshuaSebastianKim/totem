import React from 'react';
import PropTypes from 'prop-types';
import { BackIcon } from '../Icons';

const CartButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		<BackIcon style={{ width: 70, margin: 'auto' }} />
	</button>
);

CartButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

CartButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default CartButton;
