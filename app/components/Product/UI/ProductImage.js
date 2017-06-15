import React from 'react';
import PropTypes from 'prop-types';

function setSrcSize(src, size) {
	return src.split('/').map((part, index) => {
		if (index === 5) {
			return `${part}-${size}-${size}`;
		}

		return part;
	}).join('/');
}

const ProductImage = ({ className, style, src, size }) => (
	<div className={className} style={style}>
		<img src={setSrcSize(src, size)} alt={src} />
	</div>
);

ProductImage.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	size: PropTypes.number
};

ProductImage.defaultProps = {
	style: {},
	className: '',
	size: 700
};

export default ProductImage;
