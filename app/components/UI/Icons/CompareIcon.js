import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Compare from './svg/icn_compare.svg';

const CompareIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Compare} />
	</div>
);

CompareIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CompareIcon.defaultProps = {
	style: {},
	className: ''
};

export default CompareIcon;
