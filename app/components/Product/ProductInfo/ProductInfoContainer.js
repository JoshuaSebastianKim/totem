import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { UnmountClosed } from 'react-collapse';
import ProductInfo from './ProductInfo';
import styles from './ProductInfoContainer.scss';

class ProductInfoContainer extends PureComponent {
	static propTypes = {
		product: PropTypes.object.isRequired,
		prices: PropTypes.array.isRequired,
		isSpecificationsActive: PropTypes.bool
	}

	static defaultProps = {
		isSpecificationsActive: false
	}

	renderProductInfo = () => {
		const { product, prices } = this.props;

		return (
			<ProductInfo
				styles={styles}
				brand={product.brand}
				productName={product.productName}
				prices={prices}
				product={product}
			/>
		);
	}

	render() {
		const { isSpecificationsActive } = this.props;

		return (
			<div className={styles.container}>
				{/* DEFAULT INFO CONTAINER */}
				<UnmountClosed theme={{ collapse: styles.info }} isOpened={!isSpecificationsActive}>
					{this.renderProductInfo()}
				</UnmountClosed>

				{/* INLINE INFO CONTAINER */}
				<UnmountClosed
					theme={{
						collapse: styles.infoInline
					}}
					isOpened={isSpecificationsActive}
				>
					{this.renderProductInfo()}
				</UnmountClosed>
			</div>
		);
	}

}

export default ProductInfoContainer;
