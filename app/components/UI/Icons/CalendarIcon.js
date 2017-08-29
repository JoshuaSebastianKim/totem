import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Calendar from './svg/icn_calendar.svg';

const CalendarIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Calendar} />
	</div>
);

CalendarIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CalendarIcon.defaultProps = {
	style: {},
	className: ''
};

export default CalendarIcon;
