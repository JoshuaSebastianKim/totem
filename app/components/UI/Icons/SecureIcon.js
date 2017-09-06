import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Secure from './svg/icn_secure.svg';

const SecureIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Secure} />
	</div>
);

SecureIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

SecureIcon.defaultProps = {
	style: {},
	className: ''
};

export default SecureIcon;
