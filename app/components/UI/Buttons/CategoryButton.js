import React from 'react';
import PropTypes from 'prop-types';
import { CategoryIcon } from '../Icons';

const CategoryButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		<CategoryIcon style={{ width: 40, margin: 'auto' }} />
	</button>
);

CategoryButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

CategoryButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default CategoryButton;
