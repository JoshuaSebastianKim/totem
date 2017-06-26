// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProductCartItem } from '../Product';
import { CartIcon } from '../UI/Icons';
import { Button, CloseButton } from '../UI/Buttons';
import { getProductPrice } from '../Product/Utils';
import { Price } from '../UI';
import styles from './Cart.scss';

class Cart extends Component {
	static propTypes = {
		items: PropTypes.array,
		onCloseCart: PropTypes.func,
		onRemoveItem: PropTypes.func
	}

	static defaultProps = {
		items: [],
		onCloseCart: () => null,
		onRemoveItem: () => null
	}

	render() {
		const { items, onCloseCart, onRemoveItem } = this.props;
		const total = items.reduce((value, product) => {
			const price = getProductPrice(product);

			return value + price;
		}, 0);

		return (
			<div className={styles.container}>
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

				<div className={styles.content}>
					{items.length > 0 ?
						<div className={styles.cartItems}>
							{items.map(item => (
								<ProductCartItem key={item.productId} product={item} onRemoveItem={onRemoveItem} />
							))}
						</div> :
						<div className={styles.cartEmpty}>
							Vacio
						</div>
					}
				</div>

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
