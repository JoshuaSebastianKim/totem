import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = ({ className, style, src }) => (
	<div className={className} style={style}>
		<img src={src} alt={src} />
	</div>
);

ProductImage.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	src: PropTypes.string.isRequired
};

ProductImage.defaultProps = {
	style: {},
	className: ''
};

export default ProductImage;
