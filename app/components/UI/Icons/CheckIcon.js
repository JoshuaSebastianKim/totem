import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Check from './svg/icn_check.svg';

const CheckIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Check} />
	</div>
);

CheckIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CheckIcon.defaultProps = {
	style: {},
	className: ''
};

export default CheckIcon;
