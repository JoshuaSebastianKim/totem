import React from 'react';
import { CheckIcon } from '../UI/Icons';
import styles from './OrderPlacedHeader.scss';

const OrderPlacedHeader = () => (
	<div className={styles.container}>
		<CheckIcon className={styles.icon} />

		<span className={styles.label}>
			¡Tu pedido ha sido confirmado con éxito!
		</span>
	</div>
);

export default OrderPlacedHeader;
