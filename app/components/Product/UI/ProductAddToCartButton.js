import React from 'react';
import PropTypes from 'prop-types';
import { CartAddIcon } from '../../UI/Icons';

const ProductAddToCartButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		<CartAddIcon />

		<span>
			AGREGAR
		</span>
	</button>
);

ProductAddToCartButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

ProductAddToCartButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default ProductAddToCartButton;
