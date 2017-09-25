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
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.
		</div>
	</form>
);

export default reduxForm({
	form: 'payment', destroyOnUnmount: false, forceUnregisterOnUnmount: true
})(PaymentStore);
