import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from './InlineSVG';
import Location from './svg/icn_location.svg';

const LocationIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Location} />
	</div>
);

LocationIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

LocationIcon.defaultProps = {
	style: {},
	className: ''
};

export default LocationIcon;
