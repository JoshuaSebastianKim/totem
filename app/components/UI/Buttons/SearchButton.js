import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../Icons';
import { Button } from './';

const SearchButton = ({ className, style, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<SearchIcon style={{ width: 40, margin: 'auto' }} />
	</Button>
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
