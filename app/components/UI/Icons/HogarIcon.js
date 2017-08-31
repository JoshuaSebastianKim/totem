import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Hogar from './svg/icn_hogar.svg';

const HogarIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Hogar} />
	</div>
);

HogarIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

HogarIcon.defaultProps = {
	style: {},
	className: ''
};

export default HogarIcon;
