import React from 'react';
import PropTypes from 'prop-types';
import { CartIcon } from '../Icons';
import { Button } from './';

const CartButton = ({ className, style, iconSize, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<CartIcon style={{ width: iconSize, margin: 'auto' }} />
	</Button>
);

CartButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	iconSize: PropTypes.number,
	onClick: PropTypes.func
};

CartButton.defaultProps = {
	style: {},
	className: '',
	iconSize: 40,
	onClick: () => null
};

export default CartButton;
