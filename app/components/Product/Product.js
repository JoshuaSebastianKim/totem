import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Collapse } from 'react-collapse';
import ProductImageContainer from './ProductImage/ProductImageContainer';
import ProductInfoContainer from './ProductInfo/ProductInfoContainer';
import ProductDataContainer from './ProductData/ProductDataContainer';
import { calculateDiscountPercent, fetchDefaultItem, fetchProductPrices } from './Utils';
import { AddedToCartModal } from '../UI/Modal';
import { ArrowDownSmallIcon } from '../UI/Icons';
import styles from './Product.scss';

class Product extends PureComponent {
	static propTypes = {
		product: PropTypes.object
	}

	static defaultProps = {
		product: undefined
	}

	state = {
		activeImageIndex: 0,
		activeSpecifications: false
	}

	setImageIndex = index => {
		this.setState({
			activeImageIndex: index
		});
	}

	toggleSpecifications = () => {
		this.setState({
			activeSpecifications: !this.state.activeSpecifications
		});
	}

	render() {
		const { activeImageIndex, activeSpecifications } = this.state;
		const { product } = this.props;

		if (!product) {
			return <Redirect to="/" />;
		}

		const item = fetchDefaultItem(product.items);
		const prices = fetchProductPrices(product);
		const bestPrice = prices.find(price => price.type === 'price');
		const listPrice = prices.find(price => price.type === 'list-price');
		const discount = (bestPrice && listPrice) ? calculateDiscountPercent(listPrice.value, bestPrice.value) : 0;

		return (
			<div className={styles.container}>
				{/* PRODUCT IMAGE */}
				<ProductImageContainer
					discount={discount}
					images={item.images}
					activeImageIndex={activeImageIndex}
				/>

				{/* PRODUCT INFO */}
				<div className={`${styles.infoContaner} ${activeSpecifications ? styles.activeSpecsInfoContainer : ''}`}>
					<ProductInfoContainer
						product={product}
						isSpecificationsActive={activeSpecifications}
						prices={prices}
					/>

					<div className={styles.divider} />

					<ProductDataContainer
						product={product}
						isSpecificationsActive={activeSpecifications}
						onToggleSpecifications={this.toggleSpecifications}
					/>

					<Collapse
						theme={{
							collapse: styles.showSpecifications
						}}
						isOpened={!activeSpecifications}
					>
						<button className={styles.showSpecificationsButton} onClick={this.toggleSpecifications}>
							<span className={styles.showSpecificationsButtonLabel}>
								VER DATOS TÉCNICOS
							</span>

							<ArrowDownSmallIcon className={styles.showSpecificationsButtonIcon} />
						</button>
					</Collapse>
				</div>

				{/* PRODUCT MODALS */}
				<AddedToCartModal />
			</div>
		);
	}
}

export default Product;
