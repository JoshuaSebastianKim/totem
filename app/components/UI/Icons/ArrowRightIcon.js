import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import ArrowRight from './svg/icn_arrow_right_line.svg';

const ArrowRightIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={ArrowRight} />
	</div>
);

ArrowRightIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

ArrowRightIcon.defaultProps = {
	style: {},
	className: ''
};

export default ArrowRightIcon;
