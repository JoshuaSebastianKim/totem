import React from 'react';
import PropTypes from 'prop-types';

const SearchIcon = ({ className, style }) => (
	<div className={className} style={style}>
		SearchIcon
	</div>
);

SearchIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

SearchIcon.defaultProps = {
	style: {},
	className: ''
};

export default SearchIcon;
