import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../Icons';

const SearchButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		<SearchIcon style={{ width: 40, margin: 'auto' }} />
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
