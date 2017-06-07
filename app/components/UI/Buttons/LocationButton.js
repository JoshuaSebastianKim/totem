import React from 'react';
import PropTypes from 'prop-types';
import { LocationIcon } from '../Icons';

const LocationButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		<LocationIcon style={{ width: 25, margin: 'auto' }} />
	</button>
);

LocationButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

LocationButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default LocationButton;
