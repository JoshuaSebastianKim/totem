import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Back from './svg/icn_back.svg';

const BackIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Back} />
	</div>
);

BackIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

BackIcon.defaultProps = {
	style: {},
	className: ''
};

export default BackIcon;
