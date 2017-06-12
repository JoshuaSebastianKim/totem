import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	ProductBrand,
	ProductCompareButton,
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
		const prices = fetchProductPrices(product).map(
			price => Object.assign({}, price, { className: styles[price.type] })
		);

		return (
			<div className={styles.container}>
				<Link to={`/product/${product.productId}`}>
					<ProductImage
						className={styles.image}
						src={product.items[0].images[0].imageUrl}
					/>
				</Link>

				<div className={styles.info}>
					<ProductBrand className={styles.brand} brand={product.brand} />
					<Link to={`/product/${product.productId}`}>
						<ProductName className={styles.name} name={product.productName} />
					</Link>
					<div className={styles.divider} />
					<ProductPrices className={styles.prices} prices={prices} />
					<ProductCompareButton className={styles.compare} />
				</div>
			</div>
		);
	}

}

export default ProductListItem;
