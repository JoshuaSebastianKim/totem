// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion, spring } from 'react-motion';
import { ProductCartItem } from '../Product';
import { CartIcon } from '../UI/Icons';
import { Button, CloseButton } from '../UI/Buttons';
import { getProductPrice } from '../Product/Utils';
import { Price } from '../UI';
import styles from './Cart.scss';

class Cart extends Component {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		items: PropTypes.array,
		onCloseCart: PropTypes.func,
		onRemoveItem: PropTypes.func
	}

	static defaultProps = {
		className: '',
		style: {},
		items: [],
		onCloseCart: () => null,
		onRemoveItem: () => null
	}

	itemWillLeave = () => ({
		height: spring(0),
		opacity: spring(0),
		translateY: spring(-15),
		padding: spring(0),
		margin: spring(0)
	})

	itemStyles = (items) => items.map(item => ({
		data: item,
		key: item.productId,
		style: {
			height: spring(300),
			opacity: spring(1),
			translateY: spring(0),
			padding: spring(15),
			margin: spring(24)
		}
	}))

	render() {
		const { className, style, items, onCloseCart, onRemoveItem } = this.props;
		const total = items.reduce((value, product) => {
			const price = getProductPrice(product);

			return value + price;
		}, 0);

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				{/* CART HEADER */}
				<div className={styles.header}>
					<CartIcon className={styles.headerIcon} />

					<span className={styles.headerTitle}>
						Tu carrito
					</span>

					<span className={styles.headerCartAmount}>
						{items.length}
					</span>

					<CloseButton className={styles.closeCart} onClick={onCloseCart} />
				</div>

				{/* CART CONTENT */}
				<div className={styles.content}>
					{items.length > 0 ?
						<TransitionMotion
							willLeave={this.itemWillLeave}
							styles={this.itemStyles(items)}
						>
							{interpolatedStyles => (
								<div className={styles.cartItems}>
									{interpolatedStyles.map(item => (
										<ProductCartItem
											key={item.key}
											product={item.data}
											onRemoveItem={onRemoveItem}
											style={{
												opacity: item.style.opacity,
												height: item.style.height,
												paddingTop: item.style.padding,
												paddingBottom: item.style.padding,
												marginTop: item.style.margin,
												transform: `translateY(${item.style.translateY}px)`
											}}
										/>
									))}
								</div>
							)}
						</TransitionMotion> :
						<div className={styles.cartEmpty}>
							Aún no has agregado productos
							<br />
							a tu carrito
						</div>
					}
				</div>

				{/* CART FOOTER */}
				<div className={styles.footer}>
					{items.length > 0 ?
						<div className={styles.cartTotalizer}>
							<div className={styles.cartSubtotal}>
								<span className={styles.cartSubtotalLabel}>
									Subtotal:
								</span>

								<span className={styles.cartSubtotalValue}>
									<Price price={total} />
								</span>
							</div>

							<Button className={styles.checkoutButton}>
								<span className={styles.checkoutButtonLabel}>
									REALIZAR PEDIDO
								</span>
							</Button>
						</div> :
						<div />
					}
				</div>
			</div>
		);
	}
}

export default Cart;
