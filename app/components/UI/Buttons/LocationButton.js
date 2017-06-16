import React from 'react';
import PropTypes from 'prop-types';
import { LocationIcon } from '../Icons';
import { Button } from './';

const LocationButton = ({ className, style, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<LocationIcon style={{ width: 25, margin: 'auto' }} />
	</Button>
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
