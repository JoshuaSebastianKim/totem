import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	ProductBrand,
	ProductImage,
	ProductName,
	ProductPrices
} from '../UI';
import { getProductPrices } from '../Utils';
import { RemoveButton } from '../../UI/Buttons';
import styles from './ProductCartItem.scss';

class ProductCartItem extends PureComponent {
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
		onRemoveItem: PropTypes.func
	}

	static defaultProps = {
		style: {},
		className: '',
		onRemoveItem: () => null
	}

	handleItemRemove = () => {
		const { product, onRemoveItem } = this.props;

		onRemoveItem(product.productId);
	}

	render() {
		const { style, className, product } = this.props;
		const prices = getProductPrices(product).map(
			price => Object.assign({}, price, { className: styles[price.type] })
		);

		return (
			<div className={`${styles.container} ${className}`} style={style}>
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
				</div>

				<RemoveButton className={styles.removeItemButton} onClick={this.handleItemRemove} />
			</div>
		);
	}

}

export default ProductCartItem;
