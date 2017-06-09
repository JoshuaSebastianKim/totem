import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from './InlineSVG';
import ArrowDown from './svg/icn_arrow_right_line_bold.svg';

const ChevronRightIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={ArrowDown} />
	</div>
);

ChevronRightIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

ChevronRightIcon.defaultProps = {
	style: {},
	className: ''
};

export default ChevronRightIcon;
