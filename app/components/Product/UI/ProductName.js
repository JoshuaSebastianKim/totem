import React from 'react';
import PropTypes from 'prop-types';

const ProductName = ({ className, style, name }) => (
	<div className={className} style={style}>
		{name}
	</div>
);

ProductName.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	name: PropTypes.string.isRequired
};

ProductName.defaultProps = {
	style: {},
	className: ''
};

export default ProductName;
