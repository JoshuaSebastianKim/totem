import React from 'react';
import PropTypes from 'prop-types';
import { CategoryIcon } from '../Icons';
import { Button } from './';

const CategoryButton = ({ className, style, iconSize, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<CategoryIcon style={{ width: iconSize, margin: 'auto' }} />
	</Button>
);

CategoryButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	iconSize: PropTypes.number,
	onClick: PropTypes.func
};

CategoryButton.defaultProps = {
	style: {},
	className: '',
	iconSize: 40,
	onClick: () => null
};

export default CategoryButton;
