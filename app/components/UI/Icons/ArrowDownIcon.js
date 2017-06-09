import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from './InlineSVG';
import ArrowDown from './svg/icn_arrow_down_line.svg';

const ArrowDownIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={ArrowDown} />
	</div>
);

ArrowDownIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

ArrowDownIcon.defaultProps = {
	style: {},
	className: ''
};

export default ArrowDownIcon;
