import React, { Component } from 'react';
import { array, number, func } from 'prop-types';
import axios from 'axios';
import { Spinner } from '../UI';
import { UserIcon, LocationIcon, PaymentIcon } from '../UI/Icons';
import { StepSummary, PaymentStep, ProfileStep, ShippingStepAddress, ShippingStepLogistics } from './steps';
import styles from './Checkout.02.scss';

class Checkout extends Component {
	static propTypes = {
		items: array,
		saleChannel: number,
		onFocusInput: func
	}

	static defaultProps = {
		items: ['14', '11', '9', '2'],
		// items: ['25416'],
		saleChannel: 25,
		onFocusInput: () => null
	}

	state = {
		loading: true,
		error: null,
		orderForm: null,
		activeStep: 'clientProfile'
	}

	componentWillMount() {
		async function initOrderForm(items, saleChannel) {
			const { data: orderForm } = await this.getOrderForm();

			await this.changeToAnonymousUser(orderForm.orderFormId);
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

		return axios.post(`${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/items`, { orderItems }, config);
	}

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

		return axios.post(attachmentUrl, attachmentData)
			.then(this.handleAttachmentResolve)
			.catch(this.handleAttachmentReject);
	}

	handlePaymentSubmit = (data) => {
		console.log(data);
	}

	render() {
		const { loading, error, orderForm, activeStep } = this.state;
		const { onFocusInput } = this.props;

		return (
			loading ?
				<div className={styles.container}>
					<Spinner className={styles.loader} />
				</div> :
				<div className={styles.container}>
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
									onSubmit={this.handleShippingAddressSubmit}
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
									onSubmit={this.handlePaymentSubmit}
								/>
							}
						</div>
					}

					{error &&
						<div>{error}</div>
					}
				</div>
		);
	}
}

export default Checkout;
