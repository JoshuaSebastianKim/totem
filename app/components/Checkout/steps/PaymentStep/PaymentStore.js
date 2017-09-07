/* eslint global-require: 0 */
import React from 'react';
import { reduxForm, FormProps } from 'redux-form';
import styles from './PaymentStore.scss';

type Props = {} & FormProps;

const PaymentStore = ({ handleSubmit }: Props) => (
	<form onSubmit={handleSubmit} className={styles.container}>
		Pago en tienda
	</form>
);

export default reduxForm({
	form: 'payment', destroyOnUnmount: false, forceUnregisterOnUnmount: true
})(PaymentStore);
