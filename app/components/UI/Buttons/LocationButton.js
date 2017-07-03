import React from 'react';
import PropTypes from 'prop-types';
import { LocationIcon } from '../Icons';
import { Button } from './';

const LocationButton = ({ className, style, iconSize, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<LocationIcon style={{ width: iconSize, margin: 'auto' }} />
	</Button>
);

LocationButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	iconSize: PropTypes.number,
	onClick: PropTypes.func
};

LocationButton.defaultProps = {
	style: {},
	className: '',
	iconSize: 25,
	onClick: () => null
};

export default LocationButton;
