import React from 'react';
import PropTypes from 'prop-types';
import { BackIcon } from '../Icons';
import { Button } from './';

const CartButton = ({ className, style, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<BackIcon style={{ width: 70, margin: 'auto' }} />
	</Button>
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
