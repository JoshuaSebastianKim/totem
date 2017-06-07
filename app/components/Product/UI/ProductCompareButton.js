import React from 'react';
import PropTypes from 'prop-types';

const ProductCompareButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		COMPARAR
	</button>
);

ProductCompareButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

ProductCompareButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default ProductCompareButton;
