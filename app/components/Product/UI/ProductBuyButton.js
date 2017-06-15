import React from 'react';
import PropTypes from 'prop-types';
import { CartIcon } from '../../UI/Icons';

const ProductAddToCartButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		<CartIcon style={{ width: 33, margin: 'auto' }} />

		<span>
			COMPRAR AHORA
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
