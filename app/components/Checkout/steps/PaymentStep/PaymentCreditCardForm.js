/* eslint global-require: 0 */
import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { array } from 'prop-types';
import CustomField from '../CustomField';
import CustomSelect from '../CustomSelect';
import { Button } from '../../../UI/Buttons';
import { required, isNumber } from '../../../../utils/validations';
import styles from './PaymentCreditCardForm.scss';

class PaymentCreditCardForm extends Component {
	static propTypes = {
		...propTypes,
		paymentSystems: array.isRequired,
		installmentOptions: array.isRequired
	}

	constructor(props) {
		super(props);

		const { paymentSystems } = props;

		this.state = {
			selectedPaymentSystemId: this.getDefaultPaymentSystem(paymentSystems)
		};
	}

	getDefaultPaymentSystem = (paymentSystems) => paymentSystems[0].id;

	handleCardNumberChange = (ev, value) => {
		console.log(value);
	}

	renderCardInput = ({ input }) => {
		const getCardLogoSrc = (cardName) => {
			switch (cardName) {
				case 'Mastercard':
					return require('../../../../images/card_master.png');
				case 'Visa':
					return require('../../../../images/card_visa.png');
				default:
					return null;
			}
		};
		console.log(input.value);

		return (
			<label className={styles.card} htmlFor={`${input.name}-${input.value}`}>
				<input
					{...input}
					type="radio"
					id={`${input.name}-${input.value}`}
					className={styles.input}
				/>

				<img
					className={styles.image}
					src={getCardLogoSrc(input.value)}
					alt={input.value}
				/>
			</label>
		);
	}

	render() {
		const { selectedPaymentSystemId } = this.state;
		const { handleSubmit, submitting, onFocusInput, paymentSystems, installmentOptions } = this.props;

		console.log(paymentSystems, installmentOptions, selectedPaymentSystemId);

		return (
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.cardFlags}>
					<div className={styles.label}>
						Tarjeta
					</div>

					<div className={styles.flags}>
						{paymentSystems.map(ps => (
							<Field
								name="cardIssuer"
								type="radio"
								value={ps.name}
								component={this.renderCardInput}
							/>
						))}
					</div>
				</div>

				<Field
					name="cardNumber"
					label="Número"
					component={CustomField}
					validate={[required, isNumber]}
					className={styles.cardNumber}
					onFocusInput={onFocusInput}
					onChange={this.handleCardNumberChange}
				/>
			</form>
		);
	}

}

export default reduxForm({
	form: 'payment'
})(PaymentCreditCardForm);
