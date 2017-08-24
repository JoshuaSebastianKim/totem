import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Payment from './svg/icn_payment.svg';

const PaymentIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Payment} />
	</div>
);

PaymentIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

PaymentIcon.defaultProps = {
	style: {},
	className: ''
};

export default PaymentIcon;
