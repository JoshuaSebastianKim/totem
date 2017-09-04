import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Mercadopago from './svg/icn_mercadopago.svg';

const MercadopagoIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Mercadopago} />
	</div>
);

MercadopagoIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

MercadopagoIcon.defaultProps = {
	style: {},
	className: ''
};

export default MercadopagoIcon;
