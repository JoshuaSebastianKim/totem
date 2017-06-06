import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		Search
	</button>
);

SearchButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

SearchButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default SearchButton;
