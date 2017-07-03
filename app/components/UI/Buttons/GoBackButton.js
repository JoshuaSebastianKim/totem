import React from 'react';
import PropTypes from 'prop-types';
import { BackIcon } from '../Icons';
import { Button } from './';

const CartButton = ({ className, style, iconSize, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<BackIcon style={{ width: iconSize, margin: 'auto' }} />
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
	iconSize: 70,
	onClick: () => null
};

export default CartButton;
