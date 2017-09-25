import React, { Component } from 'react';
import { array, func, object } from 'prop-types';
import { CardIcon, MercadopagoIcon, StoreIcon } from '../../../UI/Icons';
import PaymentGroups from './PaymentGroups';
import PaymentStore from './PaymentStore';
import PaymentCreditCardForm from './PaymentCreditCardForm';
import styles from './PaymentStep.scss';

class PaymentStep extends Component {
	static propTypes = {
		orderForm: object.isRequired,
		onSelectedPayment: func.isRequired,
		onSubmit: func,
		onFocusInput: func,
		disabledPaymentGroups: array
	}

	static defaultProps = {
		onSubmit: () => null,
		onFocusInput: () => null,
		disabledPaymentGroups: ['creditCardPaymentGroup', 'MercadoPagoPaymentGroup']
	}

	constructor(props) {
		super(props);

		const { orderForm } = props;
		const { paymentData } = orderForm;
		const paymentGroups = this.updatePaymentGroups(paymentData.paymentSystems);
		const selectedPaymentGroupName = this.getDefaultPaymentGroup(paymentGroups);

		this.state = {
			paymentGroups,
			selectedPaymentGroupName
		};
	}

	componentWillMount() {
		const { onSelectedPayment } = this.props;
		const { paymentGroups, selectedPaymentGroupName } = this.state;
		const selectedPaymentGroup = paymentGroups.find(pg => pg.groupName === selectedPaymentGroupName);

		// If only one payment system in group select it
		if (selectedPaymentGroup.paymentSystems.length === 1) {
			onSelectedPayment(selectedPaymentGroup.paymentSystems[0]);
		}
	}

	updatePaymentGroups = (paymentSystems) => {
		const getPaymentGroupLabel = (groupName, name) => {
			switch (groupName) {
				case 'creditCardPaymentGroup':
					return 'Tarjeta de crédito';
				default:
					return name;
			}
		};
		const getPaymentGroupIcon = (groupName) => {
			switch (groupName) {
				case 'custom201PaymentGroupPaymentGroup':
					return {
						Component: StoreIcon,
						style: {
							width: 59
						}
					};
				case 'creditCardPaymentGroup':
					return {
						Component: CardIcon,
						style: {
							width: 46
						}
					};
				case 'MercadoPagoPaymentGroup':
					return {
						Component: MercadopagoIcon,
						style: {
							width: 74
						}
					};
				default:
					return null;
			}
		};

		return paymentSystems.reduce((paymentGroups, ps) => {
			if (this.props.disabledPaymentGroups.indexOf(ps.groupName) !== -1) {
				return paymentGroups;
			}

			const paymentGroupIndex = paymentGroups.findIndex(pg => pg.groupName === ps.groupName);

			if (paymentGroupIndex === -1) {
				const { groupName, name } = ps;
				const label = getPaymentGroupLabel(groupName, name);
				const icon = getPaymentGroupIcon(groupName);

				paymentGroups.push({
					groupName,
					label,
					icon,
					paymentSystems: [ps.id]
				});
			} else {
				paymentGroups[paymentGroupIndex].paymentSystems.push(ps.id);
			}

			return paymentGroups;
		}, []);
	}

	getDefaultPaymentGroup = (paymentGroups) => paymentGroups[0].groupName;

	handlePaymentGroupClick = (groupName) => {
		const { selectedPaymentGroupName } = this.state;

		if (selectedPaymentGroupName !== groupName) {
			const { onSelectedPayment } = this.props;
			const { paymentGroups } = this.state;
			const selectedPaymentGroup = paymentGroups.find(pg => pg.groupName === groupName);

			onSelectedPayment(selectedPaymentGroup.paymentSystems[0]);

			this.setState({
				selectedPaymentGroupName: groupName
			});
		}
	}

	handleCardIssuerChange = (paymentSystemId, installments, bin) => {
		this.props.onSelectedPayment(paymentSystemId, installments, bin);
	}

	handleCardNumberChange = (paymentSystemId, installments, bin) => {
		this.props.onSelectedPayment(paymentSystemId, installments, bin);
	}

	handleInstallmentsChange = (paymentSystemId, installments, bin) => {
		this.props.onSelectedPayment(paymentSystemId, installments, bin);
	}

	render() {
		const { orderForm, onSubmit, onFocusInput } = this.props;
		const { paymentGroups, selectedPaymentGroupName } = this.state;
		const selectedPaymentGroup = paymentGroups.find(pg => pg.groupName === selectedPaymentGroupName);

		return (
			<div className={styles.container}>
				<div className={styles.paymentGroups}>
					<div className={styles.title}>
						Elegí un medio de pago
					</div>

					<PaymentGroups
						paymentGroups={paymentGroups}
						selectedPaymentGroupName={selectedPaymentGroupName}
						onClick={this.handlePaymentGroupClick}
					/>
				</div>

				<div className={styles.paymentGroupFrom}>
					{selectedPaymentGroupName === 'custom201PaymentGroupPaymentGroup' &&
						<PaymentStore onSubmit={onSubmit} />
					}

					{selectedPaymentGroupName === 'creditCardPaymentGroup' &&
						<PaymentCreditCardForm
							paymentSystems={orderForm.paymentData.paymentSystems.filter(
								ps => selectedPaymentGroup.paymentSystems.indexOf(ps.id) !== -1
							)}
							installmentOptions={orderForm.paymentData.installmentOptions.filter(
								ps => selectedPaymentGroup.paymentSystems.indexOf(Number(ps.paymentSystem)) !== -1
							)}
							onCardIssuerChange={this.props.onSelectedPayment}
							onCardNumberChange={this.props.onSelectedPayment}
							onInstallmentsChange={this.props.onSelectedPayment}
							onFocusInput={onFocusInput}
							onSubmit={onSubmit}
						/>
					}

					{selectedPaymentGroupName === 'MercadoPagoPaymentGroup' &&
						<div>
							Mercadopago
						</div>
					}
				</div>
			</div>
		);
	}

}

export default PaymentStep;
