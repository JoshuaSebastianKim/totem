/* eslint global-require: 0 */
import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, propTypes } from 'redux-form';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import CustomField from '../CustomField';
import CustomSelect from '../CustomSelect';
import { CheckIcon } from '../../../UI/Icons';
import { required, isNumber, exactLength } from '../../../../utils/validations';
import styles from './PaymentCreditCardForm.scss';

class PaymentCreditCardForm extends Component {
	static propTypes = {
		...propTypes,
		paymentSystems: array.isRequired,
		installmentOptions: array.isRequired,
		onFocusInput: func,
		onCardIssuerChange: func,
		onCardNumberChange: func,
		onInstallmentsChange: func
	}

	static defaultProps = {
		onFocusInput: () => null,
		onCardIssuerChange: () => null,
		onCardNumberChange: () => null,
		onInstallmentsChange: () => null
	}

	constructor(props) {
		super(props);

		const { paymentSystems } = props;
		const defaultPaymentSystem = this.getDefaultPaymentSystem(paymentSystems);
		const defaultInstallmentOption = this.getInstallmentOption(defaultPaymentSystem);

		this.state = {
			selectedPaymentSystem: defaultPaymentSystem,
			selectedInstallmentOption: defaultInstallmentOption
		};
	}

	componentWillMount() {
		const { selectedPaymentSystem } = this.state;

		this.props.change('cardIssuer', selectedPaymentSystem.name);
		this.handleCardIssuerChange(selectedPaymentSystem);
	}

	getDefaultPaymentSystem = (paymentSystems) => paymentSystems[0];

	getInstallmentOption = (paymentSystem) => this.props.installmentOptions.find(
		io => io.paymentSystem === paymentSystem.stringId
	)

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

		return (
			<label className={styles.card} htmlFor={`${input.name}-${input.value}`}>
				<input
					{...input}
					type="radio"
					id={`${input.name}-${input.value}`}
					className={styles.input}
				/>

				<CheckIcon className={styles.icon} />

				<img
					className={styles.image}
					src={getCardLogoSrc(input.value)}
					alt={input.value}
				/>
			</label>
		);
	}

	renderSelect = ({ input, values, className, meta: { touched, error, warning, submitting } }) => (
		<div className={className}>
			<select {...input} disabled={submitting} className={styles.select}>
				<option value="" />
				{values.map(value => (
					<option key={value} value={value}>{value}</option>
				))}
			</select>

			{touched && (
				(error && <span className={styles.error}>{error}</span>) ||
				(warning && <span className={styles.warning}>{warning}</span>)
			)}
		</div>
	)

	renderInstallmentOption = (installment) => {
		const renderLabel = ({ count, value, hasInterestRate }) => {
			const formattedValue = this.props.intl.formatNumber(value / 100, {
				style: 'currency',
				currency: 'ARS'
			});

			if (count === 1) {
				return `Total - ${formattedValue}`;
			}

			return `${count} cuotas de ${formattedValue} ${!hasInterestRate ? 'sin interés' : ''}`;
		};
		const value = installment.count;
		const label = renderLabel(installment);

		return {
			value, label
		};
	}

	formatCardNumber = value => {
		if (!value) {
			return '';
		}

		return value.replace(/\s/g, '').match(/.{1,4}/g).join(' ');
	}

	normalizeCardNumber = value => value.replace(/\s/g, '');

	handleCardIssuerChange = (paymentSystem) => {
		const { onCardIssuerChange, installments, cardNumber } = this.props;
		const bin = cardNumber && cardNumber.length > 5
			? cardNumber.slice(0, 6)
			: null;

		this.setState({
			selectedPaymentSystem: paymentSystem,
			selectedInstallmentOption: this.getInstallmentOption(paymentSystem)
		});

		onCardIssuerChange(paymentSystem.id, installments ? Number(installments) : 1, bin);
	}

	handleCardNumberChange = (ev, value) => {
		const cardPaymentSystem = this.props.paymentSystems.find((ps) => {
			const { validator } = ps;

			return new RegExp(validator.regex).test(value);
		});

		if (cardPaymentSystem) {
			const { change, onCardNumberChange, installments, cardIssuer, cardNumber } = this.props;

			if (cardIssuer !== cardPaymentSystem.name) {
				const bin = cardNumber && cardNumber.length > 5
					? cardNumber.slice(0, 6)
					: null;
				change('cardIssuer', cardPaymentSystem.name);

				this.handleCardIssuerChange(cardPaymentSystem, Number(installments), bin);
			}

			if (value.length === 16) {
				onCardNumberChange(cardPaymentSystem.id, installments, value.slice(0, 6));
			}
		}
	}

	handleInstallmentsChange = (ev, value) => {
		if (value) {
			const { onInstallmentsChange, cardNumber } = this.props;
			const bin = cardNumber && cardNumber.length > 5
				? cardNumber.slice(0, 6)
				: null;

			console.log(cardNumber, bin);

			onInstallmentsChange(this.state.selectedPaymentSystem.id, Number(value), bin);
		}
	}

	render() {
		const { selectedInstallmentOption } = this.state;
		const { handleSubmit, onFocusInput, paymentSystems } = this.props;

		return (
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.cardFlags}>
					<div className={styles.label}>
						Tarjeta
					</div>

					<div className={styles.flags}>
						{paymentSystems.map(ps => (
							<Field
								key={ps.id}
								name="cardIssuer"
								type="radio"
								value={ps.name}
								component={this.renderCardInput}
								onChange={() => this.handleCardIssuerChange(ps)}
							/>
						))}
					</div>
				</div>

				<Field
					className={styles.cardNumber}
					name="cardNumber"
					label="Número"
					component={CustomField}
					// format={this.formatCardNumber}
					normalize={this.normalizeCardNumber}
					validate={[required, isNumber, exactLength(16)]}
					onFocusInput={onFocusInput}
					onChange={this.handleCardNumberChange}
					autofocus
				/>

				{selectedInstallmentOption.installments.length > 1 &&
					<Field
						className={styles.installments}
						name="installments"
						label="Cuotas disponibles"
						component={CustomSelect}
						validate={[required]}
						values={selectedInstallmentOption.installments.map(this.renderInstallmentOption)}
						onChange={this.handleInstallmentsChange}
					/>
				}

				<Field
					name="cardName"
					label="Nombre como figura en la tarjeta"
					component={CustomField}
					validate={[required]}
					className={styles.cardName}
					onFocusInput={onFocusInput}
				/>

				<div className={styles.cardData}>
					<div className={styles.cardExpiration}>
						<div className={styles.label}>
							Válida hasta
						</div>

						<Field
							name="cardExpirationMonth"
							component={this.renderSelect}
							validate={[required]}
							className={styles.cardExpirationMonth}
							values={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
						/>

						<div className={styles.divider}>/</div>

						<Field
							name="cardExpirationYear"
							component={this.renderSelect}
							validate={[required]}
							className={styles.cardExpirationYear}
							values={_.range(20).map((i) => 17 + i)}
						/>
					</div>

					<Field
						name="cardCode"
						label="Código de Seg."
						component={CustomField}
						validate={[required, isNumber]}
						className={styles.cardCode}
						onFocusInput={onFocusInput}
					/>
				</div>
			</form>
		);
	}
}

const selector = formValueSelector('payment');
const mapStateToProps = (state) => ({
	cardIssuer: selector(state, 'cardIssuer'),
	cardNumber: selector(state, 'cardNumber'),
	installments: selector(state, 'installments')
});

const PaymentCreditCardFormI18n = injectIntl(PaymentCreditCardForm);
const PaymentCreditCardFormForm = reduxForm({
	form: 'payment',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(PaymentCreditCardFormI18n);
const PaymentCreditCardFormRedux = connect(mapStateToProps)(PaymentCreditCardFormForm);

export default PaymentCreditCardFormRedux;
