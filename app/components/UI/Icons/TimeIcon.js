import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Time from './svg/icn_time.svg';

const TimeIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Time} />
	</div>
);

TimeIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

TimeIcon.defaultProps = {
	style: {},
	className: ''
};

export default TimeIcon;
