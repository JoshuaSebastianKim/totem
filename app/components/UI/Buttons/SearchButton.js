import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../Icons';
import { Button } from './';

const SearchButton = ({ className, style, iconSize, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<SearchIcon style={{ width: iconSize, margin: 'auto' }} />
	</Button>
);

SearchButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	iconSize: PropTypes.number,
	onClick: PropTypes.func
};

SearchButton.defaultProps = {
	style: {},
	className: '',
	iconSize: 40,
	onClick: () => null
};

export default SearchButton;
