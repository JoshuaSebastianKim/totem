import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import LineaBlanca from './svg/icn_linea_blanca.svg';

const LineaBlancaIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={LineaBlanca} />
	</div>
);

LineaBlancaIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

LineaBlancaIcon.defaultProps = {
	style: {},
	className: ''
};

export default LineaBlancaIcon;
