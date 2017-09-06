import React from 'react';
import { CartIcon } from '../../UI/Icons';
import { Button } from '../../UI/Buttons';
import styles from './CheckoutButton.scss';

type Props = {
	disabled: boolean,
	onClick: () => void
};

const CheckoutButton = ({ disabled, onClick }: Props) => (
	<Button
		className={styles.button}
		disabled={disabled}
		onClick={onClick}
	>
		<CartIcon className={styles.icon} />

		<span className={styles.label}>
			Finalizar compra
		</span>
	</Button>
);

CheckoutButton.defaultProps = {
	disabled: false,
	onClick: () => null
};

export default CheckoutButton;
