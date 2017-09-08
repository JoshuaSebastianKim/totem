import React, { Component } from 'react';
import { array, number, func } from 'prop-types';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Spinner } from '../UI';
import { CheckoutSubmitModal, TransactionErrorModal } from '../UI/Modal';
import { UserIcon, LocationIcon, PaymentIcon } from '../UI/Icons';
import { StepSummary, PaymentStep, ProfileStep, ShippingStepAddress, ShippingStepLogistics } from './steps';
import CartSummary from './CartSummary/CartSummary';
import Keyboard from '../../containers/KeyboardContainer';
import styles from './Checkout.02.scss';

class Checkout extends Component {
	static propTypes = {
		items: array,
		saleChannel: number,
		onFocusInput: func,
		submitForm: func,
		orderPlaced: func
	}

	static defaultProps = {
		items: ['14', '11', '9', '2'],
		// items: ['25416'],
		saleChannel: 25,
		onFocusInput: () => null,
		submitForm: () => null,
		orderPlaced: () => null
	}

	state = {
		loading: true,
		error: null,
		orderForm: null,
		activeStep: 'clientProfile',
		checkingOut: false,
		toOrderPlaced: false,
		transactionError: null,
		disableCheckout: false
	}

	componentWillMount() {
		async function initOrderForm(items, saleChannel) {
			const { data: orderForm } = await this.getOrderForm();

			await this.clearMessages(orderForm);
			await this.changeToAnonymousUser(orderForm.orderFormId);
			await this.removeAllItems(orderForm);
			await this.addToCart(orderForm, items, saleChannel);

			return this.getOrderForm()
				.then(handleOrderFormResolve)
				.catch(handleOrderFormReject);
		}
		const handleOrderFormResolve = response => {
			this.setState({
				activeStep: this.getActiveStep(response.data),
				orderForm: response.data,
				loading: false
			});

			return response.data;
		};
		const handleOrderFormReject = error => {
			console.error(error);

			this.setState({
				error,
				loading: false
			});

			return error;
		};
		const { items, saleChannel } = this.props;

		initOrderForm.call(this, items, saleChannel);
	}

	steps = [
		{
			id: 'clientProfile',
			label: 'Identificación',
			icon: {
				component: UserIcon,
				style: {
					width: 22
				}
			}
		}, {
			id: 'shipping',
			label: 'Entrega',
			icon: {
				component: LocationIcon,
				style: {
					width: 22
				}
			}
		}, {
			id: 'payment',
			label: 'Pago',
			icon: {
				component: PaymentIcon,
				style: {
					width: 35
				}
			}
		}
	]

	stepDataKeys = ['clientProfileData', 'shippingDataAddress', 'shippingDataLogistics', 'paymentData'];

	expectedOrderFormSections = [
		'items',
		'totalizers',
		'clientProfileData',
		'shippingData',
		'paymentData',
		'sellers',
		'clientPreferencesData'
	]

	hostUrl = 'https://totemwalmartarqa.vtexcommercestable.com.br';

	changeToAnonymousUser = (orderFormId) => axios.get(`${this.hostUrl}/checkout/changeToAnonymousUser/${orderFormId}`)

	getOrderForm = () => axios.get(`${this.hostUrl}/api/checkout/pub/orderForm`)

	addToCart = (orderForm, items, saleChannel) => {
		const { expectedOrderFormSections } = this;
		const orderItems = items.map(item => ({
			id: item,
			quantity: 1,
			seller: 1
		}));
		const config = {
			params: {
				sc: saleChannel
			}
		};

		return axios.post(`${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/items`,
			{ orderItems, expectedOrderFormSections },
			config
		);
	}

	removeAllItems = (orderForm) => {
		if (orderForm.items.length) {
			const orderItems = orderForm.items.map((_, index) => ({ index, quantity: 0 }));

			return axios.post(`${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/items/update`, { orderItems });
		}

		return Promise.resolve();
	}

	clearMessages = (orderForm) =>
		axios.post(`${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/messages/clear`, {
			expectedOrderFormSections: this.expectedOrderFormSections
		})

	getActiveStep = (orderForm) => {
		const clientProfileDataFields = ['document', 'email', 'firstName', 'lastName', 'phone'];
		const shippingDataAddressFields = ['city', 'number', 'postalCode', 'receiverName', 'state', 'street'];
		const activeStepData = this.stepDataKeys.find(stepDataKey => {
			const stepData = orderForm[stepDataKey.replace(/(Address|Logistics)/, '')];

			switch (stepDataKey) {
				case 'clientProfileData':
					if (stepData === null) {
						return true;
					}

					return clientProfileDataFields.some(field => stepData[field] === null);
				case 'shippingDataAddress':
					if (!stepData.address) {
						return true;
					}

					return shippingDataAddressFields.some(field => stepData.address[field] === null || stepData.address[field] === '');
				case 'shippingDataLogistics':
					return !stepData.logisticsInfo[0].slas.some((sla) => sla.deliveryWindow !== null);
				default:
					return true;
			}
		});

		return activeStepData.replace(/Data/, '');
	};

	handleStepClick = (step) => {
		const { orderForm } = this.state;
		const activeStep = this.getActiveStep(orderForm);
		const stepHierarchy = this.stepDataKeys.find(
			(stepKey) => new RegExp(step, 'ig').test(stepKey)
		);
		const stepHierarchyIndex = this.stepDataKeys.indexOf(stepHierarchy);
		const activeStepHierarchyIndex = this.stepDataKeys.findIndex(
			(stepKey) => stepKey.replace('Data', '') === activeStep
		);

		if (stepHierarchyIndex > activeStepHierarchyIndex) {
			return false;
		}

		this.setState({
			activeStep: stepHierarchy.replace('Data', '')
		});
	}

	handleAttachmentResolve = (response, activeStep = null) => {
		this.setState({
			activeStep: !activeStep ? this.getActiveStep(response.data) : activeStep,
			orderForm: response.data
		});
	}

	handleAttachmentReject = (error) => {
		console.log(error);
	}

	handleShippingLogisticsBack = () => {
		this.setState({
			activeStep: 'shippingAddress'
		});
	}

	handleProfileSubmit = (data) => {
		const { expectedOrderFormSections } = this;
		const { orderForm } = this.state;
		const attachmentUrl = `${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/clientProfileData`;
		const attachmentData = {
			expectedOrderFormSections,
			...data,
			documentType: 'dni',
			phone: data.phone,
			firstEmail: data.email,
			isCorporate: false
		};

		return axios.post(attachmentUrl, attachmentData)
			.then(this.handleAttachmentResolve)
			.catch(this.handleAttachmentReject);
	}

	handleShippingAddressSubmit = (data, holdStep = false) => {
		const { expectedOrderFormSections } = this;
		const { orderForm } = this.state;
		const { address } = orderForm.shippingData;
		const attachmentUrl = `${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`;
		const attachmentData = {
			address: Object.assign({}, address, {
				addressId: address && address.addressId,
				city: data.city,
				number: data.number,
				postalCode: data.postalCode,
				receiverName: data.receiverName,
				state: data.state ? data.state.toUpperCase() : '',
				street: data.street,
				country: 'ARG',
				addressType: 'residential'
			}),
			logisticsInfo: data.logisticsInfo,
			expectedOrderFormSections
		};

		return axios.post(attachmentUrl, attachmentData)
			.then(res => this.handleAttachmentResolve(res, (!holdStep && 'shippingLogistics')))
			.catch(this.handleAttachmentReject);
	}

	handleShippingLogisticsSubmit = (data) => {
		const { expectedOrderFormSections } = this;
		const { orderForm } = this.state;
		const { address } = orderForm.shippingData;
		const { deliveryWindow, logisticsInfo } = data;
		const formattedLogisticsInfo = logisticsInfo.map((li) => {
			const { itemIndex, selectedSla } = li;
			const isScheduled = li.slas
				.map((sla) => Object.assign({}, sla, { deliveryWindow }))
				.find((sla) => {
					if (sla.id === li.selectedSla) {
						const { availableDeliveryWindows } = sla;

						return (availableDeliveryWindows !== null ? availableDeliveryWindows.length : 0) > 0;
					}

					return false;
				});

			return {
				itemIndex,
				selectedSla,
				deliveryWindow,
				isScheduled
			};
		});
		const attachmentUrl = `${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`;
		const attachmentData = {
			expectedOrderFormSections,
			address,
			logisticsInfo: formattedLogisticsInfo
		};

		return axios.post(attachmentUrl, attachmentData)
			.then(this.handleAttachmentResolve)
			.catch(this.handleAttachmentReject);
	}

	handlePostalCodeChange = (postalCode) => {
		if (postalCode.length === 4) {
			axios.get(`${this.hostUrl}/api/checkout/pub/postal-code/ARG/${postalCode}`)
				.then((response) => this.handleShippingAddressSubmit(response.data, true))
				.catch(console.error);
		}
	}

	handleSelectedPayment = (paymentSystemId, installmentCount = 1, bin = null) => {
		const { expectedOrderFormSections } = this;
		const { orderForm } = this.state;
		const { paymentSystems, installmentOptions } = orderForm.paymentData;
		const paymentSystem = paymentSystems.find(ps => ps.id === paymentSystemId);
		const installmentOption = installmentOptions.find(opts => opts.paymentSystem === String(paymentSystemId));
		const installment = installmentOption.installments.find(i => i.count === installmentCount);
		const attachmentUrl = `${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/paymentData`;
		const attachmentData = {
			expectedOrderFormSections,
			payments: [{
				group: paymentSystem.groupName,
				paymentSystem: paymentSystemId,
				paymentSystemName: paymentSystem.name,
				installments: installmentCount,
				installmentsInterestRate: installment.interestRate,
				installmentsValue: installment.value,
				referenceValue: installmentOption.value,
				bin
			}]
		};

		this.setState({
			disableCheckout: true
		});

		return axios.post(attachmentUrl, attachmentData)
			.then((res) => {
				this.setState({
					disableCheckout: false
				});

				return this.handleAttachmentResolve(res);
			})
			.catch(this.handleAttachmentReject);
	}

	handlePaymentSubmit = (data) => {
		const startTransaction = (transactionUrl, transactionData) => axios.post(transactionUrl, transactionData, {
			headers: {
				'X-VTEX-API-appKey': 'joshua@fizzmod.com',
				'X-VTEX-API-appToken': 'Elcano3142'
			}
		});
		const sendPayments = (orderForm, groupName, clientDocument) => {
			const {
				receiverUri,
				merchantTransactions,
				paymentData,
				id,
				gatewayCallbackTemplatePath,
				shippingData
			} = orderForm;
			const orderId = gatewayCallbackTemplatePath.split('/')[3];
			const paymentsArray = paymentData.payments.map((p, index) => {
				const paymentSystem = paymentData.paymentSystems.find(ps => ps.id === Number(p.paymentSystem));
				const installmentOption = paymentData.installmentOptions.find(io => io.paymentSystem === p.paymentSystem);
				const installment = installmentOption.installments.find(i => i.count === p.installments);
				const merchant = merchantTransactions.find(m => m.id === p.merchantSellerPayments[0].id);

				let paymentObject = {
					accountId: p.accountId,
					avaiableAccounts: undefined,
					bin: p.bin,
					currencyCode: 'ARS',
					fields: undefined,
					group: paymentSystem.groupName,
					installments: p.installments,
					installmentsInterestRate: installment.interestRate,
					installmentsValue: installment.value,
					transaction: {
						id,
						merchantName: merchant.merchantName
					},
					paymentSystem: paymentSystem.id,
					paymentSystemName: paymentSystem.name,
					referenceValue: p.referenceValue,
					value: p.value,
					originalPaymentIndex: index
				};

				if (paymentSystem.groupName === 'creditCardPaymentGroup') {
					paymentObject = Object.assign({}, paymentObject, {
						chooseToUseNewCard: true,
						fields: {
							address: null,
							addressId: shippingData.address.addressId,
							bin: p.bin,
							cardNumber: data.cardNumber,
							document: clientDocument,
							dueDate: `${data.cardExpirationMonth}/${data.cardExpirationYear}`,
							holderName: data.cardName,
							validationCode: data.cardCode
						},
						groupName: paymentSystem.groupName,
						id,
						interestRate: installment.interestRate,
						installmentValue: installment.value,
						isBillingAddressDifferent: false
					});
				}

				return paymentObject;
			});

			if (groupName === 'creditCardPaymentGroup') {
				const url = `https://totemwalmartarqa.vtexpayments.com.br/api/pub/transactions/${id}/payments`;
				const formData = paymentsArray;

				return axios.post(url, formData, {
					params: {
						orderId,
						callbackUrl: `${this.hostUrl}${gatewayCallbackTemplatePath}`
					}
				}).then(() => axios.get(`${this.hostUrl}/api/checkout/pub/orders/order-group/${orderId}`));
			}

			const formData = new FormData();

			formData.append('paymentsArray', JSON.stringify(paymentsArray));
			formData.append('callbackUrl', `${this.hostUrl}${gatewayCallbackTemplatePath}`);

			return axios.post(receiverUri, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
				.then(() => axios.get(`${this.hostUrl}/api/checkout/pub/orders/order-group/${orderId}`));
		};
		const checkOrderStatus = (orders) => {
			const isCompleted = orders.some(o => o.isCompleted);

			if (isCompleted) {
				return Promise.resolve(orders);
			}

			return this.getOrderForm()
				.then(({ data: { messages } }) => {
					const transactionError = messages.find(m => m.code === 'transactionAuthorizationDenied');

					console.log(transactionError);

					if (transactionError) {
						return Promise.reject(transactionError.text);
					}

					return Promise.reject('Ocurrió un error inesperado, por favor intente de nuevo');
				});
		};
		const orderPlaced = orders => {
			this.props.orderPlaced(orders);

			this.setState({
				toOrderPlaced: true
			});
		};
		const showError = (errorString) => {
			console.log(errorString);
			const [message, details] = errorString.split(/ \*\*\* /);
			const error = { message, details };

			this.setState({
				checkingOut: false,
				transactionError: error
			});
		};
		const { expectedOrderFormSections } = this;
		const { orderForm } = this.state;
		const { installmentOptions, paymentSystems, payments } = orderForm.paymentData;
		const [payment] = payments;
		const paymentSystem = paymentSystems.find(ps => ps.id === Number(payment.paymentSystem));
		const installmentOption = installmentOptions.find(io => io.paymentSystem === payment.paymentSystem);
		const installment = installmentOption.installments.find(i => i.count === payment.installments);
		const transactionUrl = `${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/transaction`;
		const transactionData = {
			expectedOrderFormSections,
			interestValue: installment.interestRate,
			optinNewsletter: true,
			referenceId: orderForm.orderFormId,
			referenceValue: payment.referenceValue,
			value: payment.value,
			savePersonalData: false
		};

		this.setState({
			checkingOut: true
		});

		return startTransaction(transactionUrl, transactionData)
			.then(res => sendPayments(res.data, paymentSystem.groupName, orderForm.clientProfileData.document))
			.then(res => checkOrderStatus(res.data))
			.then(orderPlaced)
			.catch(showError);
	}

	handleCheckoutClick = () => {
		this.props.submitForm('payment');
	}

	handleTransactionErrorModalClose = () => {
		this.setState({
			transactionError: null
		});
	}

	render() {
		const {
			loading,
			error,
			orderForm,
			activeStep,
			checkingOut,
			toOrderPlaced,
			transactionError,
			disableCheckout
		} = this.state;
		const { onFocusInput, items } = this.props;

		if (items.length === 0) {
			return <Redirect to="/" />;
		}

		if (toOrderPlaced) {
			return <Redirect to="/orderPlaced" />;
		}

		return (
			loading ?
				<div className={styles.container}>
					<Spinner className={styles.loader} />
				</div> :
				<div className={styles.container}>
					<div className={styles.checkoutForm}>
						<div className={styles.title}>
							Completa los siguientes datos para finalizar la compra
						</div>

						<div className={styles.stepsSummary}>
							<StepSummary
								steps={this.steps}
								activeStep={activeStep.replace(/(Address|Logistics)/, '')}
								onClick={this.handleStepClick}
							/>
						</div>

						{orderForm &&
							<div className={styles.orderForm}>
								{activeStep === 'clientProfile' &&
									<ProfileStep
										initialValues={orderForm.clientProfileData}
										onSubmit={this.handleProfileSubmit}
										onFocusInput={onFocusInput}
									/>
								}

								{activeStep === 'shippingAddress' &&
									<ShippingStepAddress
										initialValues={orderForm.shippingData.address || {}}
										onSubmit={data => this.handleShippingAddressSubmit(data)}
										onFocusInput={onFocusInput}
										onPostalCodeChange={this.handlePostalCodeChange}
									/>
								}

								{activeStep === 'shippingLogistics' &&
									<ShippingStepLogistics
										onBack={this.handleShippingLogisticsBack}
										onSubmit={this.handleShippingLogisticsSubmit}
										orderForm={orderForm}
									/>
								}

								{activeStep === 'payment' &&
									<PaymentStep
										orderForm={orderForm}
										onSelectedPayment={this.handleSelectedPayment}
										onFocusInput={onFocusInput}
										onSubmit={this.handlePaymentSubmit}
									/>
								}

							</div>
						}

						{error &&
							<div>{error}</div>
						}

						<div className={styles.keyboard}>
							<Keyboard />
						</div>
					</div>
					<div className={styles.checkoutSummary}>
						{orderForm &&
							<CartSummary
								orderForm={orderForm}
								enableCheckout={activeStep === 'payment' && !disableCheckout}
								onCheckout={this.handleCheckoutClick}
							/>
						}
					</div>

					<CheckoutSubmitModal isOpen={checkingOut} />

					<TransactionErrorModal
						isOpen={transactionError !== null}
						onRequestClose={this.handleTransactionErrorModalClose}
						error={transactionError !== null ? transactionError : {}}
					/>
				</div>
		);
	}
}

export default Checkout;
