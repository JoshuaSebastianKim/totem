import React from 'react';
import PropTypes from 'prop-types';

const LocationButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		Location
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
