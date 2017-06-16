import React, { PureComponent } from 'react';
import { Collapse, UnmountClosed } from 'react-collapse';
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
import { ArrowDownSmallIcon, CloseIcon, DetailIcon, SpecificationIcon } from '../UI/Icons';
import styles from './Product.scss';

class Product extends PureComponent {
	static propTypes = {
		product: PropTypes.object
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

	calculateDiscountPercent = (listPrice, bestPrice) => Math.round(((listPrice - bestPrice) * 100) / listPrice)

	toggleSpecifications = () => {
		this.setState({
			activeSpecifications: !this.state.activeSpecifications
		});
	}

	render() {
		const { activeImageIndex, activeSpecifications } = this.state;
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

				<div className={`${styles.infoContaner} ${activeSpecifications ? styles.activeSpecsInfoContainer : ''}`}>
					{/* DEFAULT INFO CONTAINER */}
					<UnmountClosed theme={{ collapse: styles.info }} isOpened={!activeSpecifications}>
						<ProductBrand className={styles.brand} brand={product.brand} />
						<ProductName className={styles.name} name={product.productName} />
						<ProductPrices className={styles.prices} prices={prices} />

						<div className={styles.actionsContainer}>
							<ProductAddToCartButton className={styles.addToCart} />
							<ProductBuyButton className={styles.buy} />
							<ProductPrintTicketButton className={styles.printTicket} />
						</div>
					</UnmountClosed>

					{/* INLINE INFO CONTAINER */}
					<UnmountClosed
						theme={{
							collapse: styles.infoInline,
							content: styles.infoInlineContent
						}}
						isOpened={activeSpecifications}
					>
						<ProductName className={styles.name} name={product.productName} />
						<ProductPrices className={styles.prices} prices={prices} />

						<div className={styles.actionsContainer}>
							<ProductAddToCartButton className={styles.addToCart} />
							<ProductBuyButton className={styles.buy} />
							<ProductPrintTicketButton className={styles.printTicket} />
						</div>
					</UnmountClosed>

					<div className={styles.divider} />

					<div className={styles.dataContainer}>
						{/* PRODUCT DESCRIPTION */}
						<UnmountClosed
							theme={{
								collapse: styles.description,
								content: styles.descriptionContent
							}}
							fixedHeight={400}
							isOpened={!activeSpecifications}
						>
							<div className={styles.descriptionHead}>
								<DetailIcon className={styles.descriptionHeadIcon} />

								<span className={styles.descriptionHeadText}>
									Sobre el producto
								</span>
							</div>

							<div
								className={styles.descriptionBody}
								dangerouslySetInnerHTML={{ __html: product.description }}
							/>
						</UnmountClosed>

						{/* PRODUCT SPECIFICATIONS */}
						<UnmountClosed
							theme={{
								collapse: styles.specifications,
								content: styles.specificationsContent
							}}
							isOpened={activeSpecifications}
						>
							<div className={styles.specificationsHead}>
								<SpecificationIcon className={styles.specificationsHeadIcon} />

								<span className={styles.specificationsHeadText}>
									Especificaciones
								</span>

								<button
									className={styles.specificationsClose}
									onClick={this.toggleSpecifications}
								>
									<CloseIcon />
								</button>
							</div>

							<div className={styles.specificationsBody}>
								SPECS
							</div>
						</UnmountClosed>
					</div>

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
			</div>
		);
	}
}

export default Product;
