import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Cart from './svg/icn_cart.svg';

const CartIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Cart} />
	</div>
);

CartIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CartIcon.defaultProps = {
	style: {},
	className: ''
};

export default CartIcon;
