import React from 'react';
import PropTypes from 'prop-types';
import ProductNoStock from './ProductNoStock';
import { Price } from '../../UI';

const ProductPrices = ({ className, style, prices }) => (
	<div className={className} style={style}>
		{prices.length ?
			prices.map(price => (
				<div key={price.type}>
					<Price price={price.value} />
				</div>
			)) :
			<ProductNoStock />
		}
	</div>
);

ProductPrices.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	prices: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			value: PropTypes.number.isRequired
		})
	).isRequired
};

ProductPrices.defaultProps = {
	style: {},
	className: ''
};

export default ProductPrices;
