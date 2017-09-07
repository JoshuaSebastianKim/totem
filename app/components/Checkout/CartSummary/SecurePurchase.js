// @flow
import React from 'react';
import { SecureIcon } from '../../UI/Icons';
import styles from './SecurePurchase.scss';

type Props = {
	label?: string
};

const SecurePurchase = ({ label }: Props) => (
	<div className={styles.container}>
		<SecureIcon className={styles.icon} />

		<span className={styles.label}>
			{label}
		</span>
	</div>
);

SecurePurchase.defaultProps = {
	label: 'Tu compra es 100% segura'
};

export default SecurePurchase;
