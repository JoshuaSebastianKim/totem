import React from 'react';
import type { Totalizer } from '../../types';
import { Price } from '../UI';
import { CartIcon } from '../UI/Icons';
import styles from './OrderTotalizers.scss';

type Props = {
	total: number,
	totalizers: Array<any>
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

const OrderTotalizers = ({ total, totalizers }: Props) => (
	<div className={styles.container}>
		<div className={styles.title}>
			<CartIcon className={styles.icon} />

			<span className={styles.label}>
				Resumen
			</span>
		</div>

		<div className={styles.totalizers}>
			{totalizers.map(t => (t.value !== 0 || t.id === 'Shipping') && (
				<div key={t.id} className={styles.totalizer}>
					<span className={styles.label}>{getLabel(t)}</span>

					<span className={styles.value}>
						{t.value !== 0 ?
							<Price price={t.value / 100} /> :
							'Gratis'
						}
					</span>
				</div>
			))}

			<div className={styles.total}>
				<span className={styles.label}>Total</span>
				<span className={styles.value}>
					<Price price={total / 100} />
				</span>
			</div>
		</div>
	</div>
);

export default OrderTotalizers;
