import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Buttons';
import styles from './OrderPlacedMessage.scss';

type Props = {
	email: string
};

const OrderPlacedMessage = ({ email }: Props) => (
	<div className={styles.container}>
		<div className={styles.message}>
			Enviaremos un mail a {email} con los detalles de tu compra.
		</div>

		<Link to="/">
			<Button className={styles.button}>
				Hacer una nueva compra
			</Button>
		</Link>
	</div>
);

export default OrderPlacedMessage;
