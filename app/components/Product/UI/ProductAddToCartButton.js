import React from 'react';
import PropTypes from 'prop-types';
import { CartAddIcon } from '../../UI/Icons';
import { Button } from '../../UI/Buttons';

const ProductAddToCartButton = ({ className, style, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<CartAddIcon />

		<span>
			AGREGAR
		</span>
	</Button>
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
