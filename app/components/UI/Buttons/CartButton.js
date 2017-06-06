import React from 'react';
import PropTypes from 'prop-types';

const CartButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		Cart
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
