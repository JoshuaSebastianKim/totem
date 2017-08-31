import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Tecnologia from './svg/icn_tecnologia.svg';

const TecnologiaIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Tecnologia} />
	</div>
);

TecnologiaIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

TecnologiaIcon.defaultProps = {
	style: {},
	className: ''
};

export default TecnologiaIcon;
