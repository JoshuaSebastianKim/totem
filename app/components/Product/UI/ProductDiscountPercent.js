import React from 'react';
import PropTypes from 'prop-types';

const ProductDiscountPercent = ({ className, style, discount }) => (
	<div className={className} style={style}>
		- {discount} %
	</div>
);

ProductDiscountPercent.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	discount: PropTypes.number.isRequired
};

ProductDiscountPercent.defaultProps = {
	style: {},
	className: ''
};

export default ProductDiscountPercent;
