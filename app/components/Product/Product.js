import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Motion, spring } from 'react-motion';
import {
	ProductAddToCartButton,
	ProductBrand,
	ProductBuyButton,
	ProductDiscountPercent,
	ProductImage,
	ProductName,
	ProductPrices,
	ProductPrintTicketButton
} from './UI';
import { fetchDefaultItem, fetchProductPrices } from './Utils';
import { DetailsIcon } from '../UI/Icons';
import styles from './Product.scss';

class Product extends PureComponent {
	static propTypes = {
		product: PropTypes.object
	}

	state = {
		activeImageIndex: 0
	}

	setImageIndex = index => {
		this.setState({
			activeImageIndex: index
		});
	}

	calculateDiscountPercent = (listPrice, bestPrice) => Math.round(((listPrice - bestPrice) * 100) / listPrice)

	render() {
		const { activeImageIndex } = this.state;
		const { product } = this.props;
		console.log(product);

		if (!product) {
			return <Redirect to="/" />;
		}

		const item = fetchDefaultItem(product.items);
		const prices = fetchProductPrices(product).map(
			price => Object.assign({}, price, { className: styles[price.type] })
		);
		const bestPrice = prices.find(price => price.type === 'price');
		const listPrice = prices.find(price => price.type === 'list-price');
		const discount = (bestPrice && listPrice) ? this.calculateDiscountPercent(listPrice.value, bestPrice.value) : 0;

		return (
			<div className={styles.container}>
				<div className={styles.imageContainer}>
					<ProductDiscountPercent
						className={styles.discount}
						style={{ visibility: discount === 0 ? 'hidden' : 'visible' }}
						discount={discount}
					/>

					<ProductImage
						className={styles.image}
						src={item.images[activeImageIndex].imageUrl}
					/>

					<div className={styles.thumbnails}>
						{item.images.map((image, index) => (
							<Motion
								key={image.imageId}
								defaultStyle={{ translateY: 0, opacity: 0, btnOpacity: 0 }}
								style={{
									translateY: activeImageIndex === index ? spring(0) : spring(100),
									opacity: activeImageIndex === index ? spring(1) : spring(0),
									btnOpacity: activeImageIndex === index ? spring(1) : spring(0.5)
								}}
							>
								{interpolatedStyles => (
									<button
										className={styles.thumbnail}
										style={{
											opacity: interpolatedStyles.btnOpacity
										}}
										onClick={() => this.setImageIndex(index)}
									>
										<ProductImage
											className={styles.thumbnailImage}
											src={image.imageUrl}
										/>

										<div
											className={styles.thumbnailActiveIndicator}
											style={{
												transform: `translateY(${interpolatedStyles.translateY}%)`,
												opacity: interpolatedStyles.opacity
											}}
										/>
									</button>
								)}
							</Motion>
						))}
					</div>
				</div>

				<div className={styles.infoContaner}>
					<ProductBrand className={styles.brand} brand={product.brand} />
					<ProductName className={styles.name} name={product.productName} />
					<ProductPrices className={styles.prices} prices={prices} />

					<div className={styles.actionsContainer}>
						<ProductAddToCartButton />
						<ProductBuyButton />
						<ProductPrintTicketButton />
					</div>

					<div className={styles.description}>
						<div className={styles.descriptionHead}>
							<DetailsIcon className={styles.descriptionHeadIcon} />

							<span className={styles.descriptionHeadText}>
								Sobre el producto
							</span>
						</div>

						<div className={styles.descriptionBody}>
							{product.description}
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Product;
