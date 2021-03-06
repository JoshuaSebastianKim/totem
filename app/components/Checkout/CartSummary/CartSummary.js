// @flow
import React from 'react';
import type { OrderForm } from '../../../types';
import SecurePurchase from './SecurePurchase';
import CartItems from './CartItems';
import CartTotalizers from './CartTotalizers';
import CheckoutButton from './CheckoutButton';
import styles from './CartSummary.scss';

type Props = {
	orderForm: OrderForm,
	enableCheckout: boolean,
	onCheckout: () => void
};

const CartSummary = ({ orderForm, enableCheckout, onCheckout }: Props) => (
	<div className={styles.container}>
		<SecurePurchase />

		<CartItems items={orderForm.items} />

		<CartTotalizers total={orderForm.value} totalizers={orderForm.totalizers} />

		<CheckoutButton disabled={!enableCheckout} onClick={onCheckout} />
	</div>
);

export default CartSummary;
