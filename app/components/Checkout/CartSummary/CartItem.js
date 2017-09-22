// @flow
import React from 'react';
import type { OrderItem } from '../../../types';
import { Price } from '../../UI';
import styles from './CartItem.scss';

const CartItem = (item: OrderItem) => (
	<div className={styles.item}>
		<img
			className={styles.image}
			src={item.imageUrl}
			alt={item.name}
		/>

		<div className={styles.info}>
			<div className={styles.brand}>
				{item.additionalInfo.brandName}
			</div>

			<div className={styles.name}>
				{item.name}
			</div>

			<div className={styles.itemValues}>
				<div className={styles.prices}>
					{item.listPrice !== item.sellingPrice &&
						<div className={styles.listPrice}>
							<Price price={item.listPrice / 100} />
						</div>
					}

					<div className={styles.sellingPrice}>
						<Price price={item.sellingPrice / 100} />
					</div>
				</div>

				<div className={styles.quantity}>
					x{item.quantity}
				</div>
			</div>
		</div>
	</div>
);

export default CartItem;
