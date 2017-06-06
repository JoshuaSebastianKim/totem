import React from 'react';
import PropTypes from 'prop-types';

const ProductBrand = ({ className, style, brand }) => (
	<div className={className} style={style}>
		{brand}
	</div>
);

ProductBrand.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	brand: PropTypes.string.isRequired
};

ProductBrand.defaultProps = {
	style: {},
	className: ''
};

export default ProductBrand;
