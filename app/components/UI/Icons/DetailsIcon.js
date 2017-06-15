import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from './InlineSVG';
import Details from './svg/icn_details.svg';

const DetailsIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Details} />
	</div>
);

DetailsIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

DetailsIcon.defaultProps = {
	style: {},
	className: ''
};

export default DetailsIcon;
