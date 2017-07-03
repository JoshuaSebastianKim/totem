import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	ProductAddToCartButton,
	ProductBrand,
	ProductBuyButton,
	ProductName,
	ProductPrices,
	ProductPrintTicketButton
} from './../UI';
import { addToCart } from '../../../redux/modules/cart';
import { printTicket } from '../../../redux/modules/printer';

class ProductInfo extends PureComponent {
	static propTypes = {
		brand: PropTypes.string.isRequired,
		productName: PropTypes.string.isRequired,
		prices: PropTypes.array.isRequired,
		product: PropTypes.object.isRequired,
		styles: PropTypes.object,
		onAddToCart: PropTypes.func,
		onPrintTicket: PropTypes.func
	}

	static defaultProps = {
		styles: {},
		onAddToCart: () => null,
		onPrintTicket: () => null
	}

	handleAddToCart = () => {
		const { product, onAddToCart } = this.props;

		onAddToCart(product.productId);
	}

	handlePrintTicket = () => {
		const { product, onPrintTicket } = this.props;

		onPrintTicket(product);
	}

	render() {
		const { styles, brand, productName, prices } = this.props;

		return (
			<div className={styles.productInfo}>
				<ProductBrand className={styles.brand} brand={brand} />
				<ProductName className={styles.name} name={productName} />
				<ProductPrices
					className={styles.prices}
					prices={prices.map(price => Object.assign(
						{}, price, { className: styles[price.type] }
					))}
				/>

				<div className={styles.actionsContainer}>
					<ProductAddToCartButton
						className={styles.addToCart}
						onClick={this.handleAddToCart}
					/>

					<ProductBuyButton className={styles.buy} />

					<ProductPrintTicketButton
						className={styles.printTicket}
						onClick={this.handlePrintTicket}
					/>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onAddToCart: addToCart,
		onPrintTicket: printTicket
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(ProductInfo);
