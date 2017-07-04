import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import ArrowLeft from './svg/icn_arrow_left_line.svg';

const ArrowLeftIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={ArrowLeft} />
	</div>
);

ArrowLeftIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

ArrowLeftIcon.defaultProps = {
	style: {},
	className: ''
};

export default ArrowLeftIcon;
