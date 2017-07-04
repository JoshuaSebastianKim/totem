import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Specification from './svg/icn_specification.svg';

const SpecificationIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Specification} />
	</div>
);

SpecificationIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

SpecificationIcon.defaultProps = {
	style: {},
	className: ''
};

export default SpecificationIcon;
