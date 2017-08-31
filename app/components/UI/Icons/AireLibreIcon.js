import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import AireLibre from './svg/icn_aire_libre.svg';

const AireLibreIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={AireLibre} />
	</div>
);

AireLibreIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

AireLibreIcon.defaultProps = {
	style: {},
	className: ''
};

export default AireLibreIcon;
