import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from './InlineSVG';
import Logo from './svg/isologo_walmart.svg';

const LogoIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Logo} />
	</div>
);

LogoIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

LogoIcon.defaultProps = {
	style: {},
	className: ''
};

export default LogoIcon;
