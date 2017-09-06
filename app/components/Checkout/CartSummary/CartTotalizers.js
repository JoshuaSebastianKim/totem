// @flow
import React from 'react';
import type { Totalizer } from '../../../types';
import { Price } from '../../UI';
import styles from './CartTotalizers.scss';

type Props = {
	total: number,
	totalizers: Array<Totalizer>
};

function getLabel(totalizer: Totalizer) {
	switch (totalizer.id) {
		case 'Items':
			return 'Subtotal';
		case 'Shipping':
			return 'Envío';
		default:
			return totalizer.name;
	}
}

const CartTotalizers = ({ total, totalizers }: Props) => (
	<div className={styles.container}>
		<div className={styles.totalizers}>
			{totalizers.map(totalizer => (
				<div key={totalizer.id} className={styles.totalizer}>
					<span className={styles.label}>
						{getLabel(totalizer)}
					</span>

					<span className={styles.value}>
						<Price price={totalizer.value / 100} />
					</span>
				</div>
			))}
		</div>

		<div className={styles.total}>
			<span className={styles.label}>
				Total
			</span>

			<span className={styles.value}>
				<Price price={total / 100} />
			</span>
		</div>
	</div>
);

export default CartTotalizers;
