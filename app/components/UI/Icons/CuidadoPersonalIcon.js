import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import CuidadoPersonal from './svg/icn_cuidado_personal.svg';

const CuidadoPersonalIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={CuidadoPersonal} />
	</div>
);

CuidadoPersonalIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CuidadoPersonalIcon.defaultProps = {
	style: {},
	className: ''
};

export default CuidadoPersonalIcon;
