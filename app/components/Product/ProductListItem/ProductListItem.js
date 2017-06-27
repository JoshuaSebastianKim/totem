import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	ProductBrand,
	ProductCompareButton,
	ProductDiscountPercent,
	ProductImage,
	ProductName,
	ProductPrices
} from '../UI';
import { calculateDiscountPercent, getProductPrices } from '../Utils';
import styles from './ProductListItem.scss';

class ProductListItem extends PureComponent {
	static propTypes = {
		product: PropTypes.object.isRequired,
		style: PropTypes.object,
		className: PropTypes.string,
		showCompare: PropTypes.bool
	}

	static defaultProps = {
		style: {},
		className: '',
		showCompare: false
	}

	render() {
		const { style, className, product, showCompare } = this.props;
		const prices = getProductPrices(product).map(
			price => Object.assign({}, price, { className: styles[price.type] })
		);
		const bestPrice = prices.find(price => price.type === 'price');
		const listPrice = prices.find(price => price.type === 'list-price');
		const discount = (bestPrice && listPrice) ? calculateDiscountPercent(listPrice.value, bestPrice.value) : 0;

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				<ProductDiscountPercent
					className={styles.discount}
					style={{ visibility: discount === 0 ? 'hidden' : 'visible' }}
					discount={discount}
				/>

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

					{showCompare &&
						<ProductCompareButton className={styles.compare} />
					}
				</div>
			</div>
		);
	}

}

export default ProductListItem;
