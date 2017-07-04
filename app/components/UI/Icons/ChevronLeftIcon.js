import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import ArrowDown from './svg/icn_arrow_left_line_bold.svg';

const ChevronLeftIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={ArrowDown} />
	</div>
);

ChevronLeftIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

ChevronLeftIcon.defaultProps = {
	style: {},
	className: ''
};

export default ChevronLeftIcon;
