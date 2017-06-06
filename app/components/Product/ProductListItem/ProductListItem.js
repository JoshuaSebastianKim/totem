import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	ProductBrand,
	ProductImage,
	ProductName,
	ProductPrices
} from '../UI';
import { fetchProductPrices } from '../Utils';
import styles from './ProductListItem.scss';

class ProductListItem extends PureComponent {
	static propTypes = {
		product: PropTypes.object.isRequired
	}

	render() {
		const { product } = this.props;

		console.log(fetchProductPrices(product));

		return (
			<div className={styles.container}>
				{/* <ProductImage src={product.items[0].images[0].imageUrl} /> */}

				<div className={styles.info}>
					<ProductBrand brand={product.brand} />
					<ProductName name={product.productName} />
					<ProductPrices prices={fetchProductPrices(product)} />
				</div>
			</div>
		);
	}

}

export default ProductListItem;
