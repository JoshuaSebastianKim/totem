/* eslint global-require: 0 */
import React from 'react';
import { reduxForm, FormProps } from 'redux-form';
import styles from './PaymentStore.scss';

type Props = {} & FormProps;

const PaymentStore = ({ handleSubmit }: Props) => (
	<form onSubmit={handleSubmit} className={styles.container}>
		<div className={styles.title}>
			Finalizá tu compra
		</div>
		<div className={styles.message}>
			Para finalizar tu compra e imprimir tu ticket presioná el boton "Finalizar compra", que se encuentra abajo a la derecha.
		</div>
	</form>
);

export default reduxForm({
	form: 'payment', destroyOnUnmount: false, forceUnregisterOnUnmount: true
})(PaymentStore);
