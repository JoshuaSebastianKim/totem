import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import { CheckIcon } from '../../UI/Icons';
import { toggleCompareItem } from '../../../redux/modules/compare';
import { isCompareActive } from '../../../redux/selectors/compareSelectors';
import styles from './ProductListItem.scss';

class ProductListItem extends PureComponent {
	static propTypes = {
		product: PropTypes.object.isRequired,
		style: PropTypes.object,
		className: PropTypes.string,
		showCompare: PropTypes.bool,
		onCompare: PropTypes.func,
		isComparing: PropTypes.bool
	}

	static defaultProps = {
		style: {},
		className: '',
		showCompare: false,
		onCompare: () => null,
		isComparing: false
	}

	handleCompareProduct = () => {
		const { product, onCompare } = this.props;

		onCompare(product.productId);
	}

	render() {
		const { style, className, product, showCompare, isComparing } = this.props;
		const prices = getProductPrices(product).map(
			price => Object.assign({}, price, { className: styles[price.type] })
		);
		const bestPrice = prices.find(price => price.type === 'price');
		const listPrice = prices.find(price => price.type === 'list-price');
		const discount = (bestPrice && listPrice) ? calculateDiscountPercent(listPrice.value, bestPrice.value) : 0;

		return (
			<div
				className={`${styles.container} ${isComparing ? styles.compareActive : ''} ${className}`}
				style={style}
			>
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
						<ProductCompareButton
							className={styles.compareButton}
							onClick={this.handleCompareProduct}
						>
							<CheckIcon className={styles.compareButtonIcon} />
							<span className={styles.compareButtonLabel}>
								COMPARAR
							</span>
						</ProductCompareButton>
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		isComparing: isCompareActive(state, props)
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onCompare: toggleCompareItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);
