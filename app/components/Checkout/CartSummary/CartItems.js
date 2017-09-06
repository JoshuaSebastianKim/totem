// @flow
import React from 'react';
import type { CartItem as Item } from '../../../types';
import CartItem from './CartItem';
import { CartIcon } from '../../UI/Icons';
import styles from './CartItems.scss';

type Props = {
	items: Array<Item>
};

const CartItems = ({ items }: Props) => (
	<div className={styles.container}>
		<div className={styles.title}>
			<CartIcon className={styles.icon} />

			<span className={styles.label}>
				Resumen
			</span>
		</div>

		<div className={styles.items}>
			{items.map(item => (
				<CartItem key={item.id} {...item} />
			))}
		</div>
	</div>
);

export default CartItems;
