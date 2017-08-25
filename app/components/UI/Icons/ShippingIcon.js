import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Shipping from './svg/icn_shipping.svg';

const ShippingIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Shipping} />
	</div>
);

ShippingIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

ShippingIcon.defaultProps = {
	style: {},
	className: ''
};

export default ShippingIcon;
