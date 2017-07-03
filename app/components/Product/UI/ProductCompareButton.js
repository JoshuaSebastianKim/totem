import React from 'react';
import PropTypes from 'prop-types';

const ProductCompareButton = ({ children, className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		{children}
	</button>
);

ProductCompareButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node
};

ProductCompareButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default ProductCompareButton;
