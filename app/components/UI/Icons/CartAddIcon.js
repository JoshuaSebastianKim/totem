import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from './InlineSVG';
import CartAdd from './svg/icn_cart_add.svg';

const CartAddIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={CartAdd} />
	</div>
);

CartAddIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CartAddIcon.defaultProps = {
	style: {},
	className: ''
};

export default CartAddIcon;
