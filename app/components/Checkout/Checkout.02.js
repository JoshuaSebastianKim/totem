import React, { Component } from 'react';
import { array, number, func } from 'prop-types';
import axios from 'axios';
import { Spinner } from '../UI';
import { UserIcon, LocationIcon, PaymentIcon } from '../UI/Icons';
import { StepSummary, ProfileStep, ShippingStepAddress, ShippingStepLogistics } from './steps';
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

		this.getOrderForm()
			.then(handleOrderFormResolve)
			.catch(handleOrderFormReject);
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

	hostUrl = 'https://totemwalmartarqa.vtexcommercestable.com.br';

	getOrderForm = () => axios.get(`${this.hostUrl}/api/checkout/pub/orderForm`)

	addToCart = (items) => {

	}

	getActiveStep = (orderForm) => {
		const clientProfileDataFields = ['document', 'email', 'firstName', 'lastName', 'phone'];
		const shippingDataAddressFields = ['city', 'number', 'postalCode', 'receiverName', 'state', 'street'];
		const activeStepData = this.stepDataKeys.find(stepDataKey => {
			const stepData = orderForm[stepDataKey.replace(/(Address|Logistics)/, '')];

			switch (stepDataKey) {
				case 'clientProfileData':
					return clientProfileDataFields.some(field => stepData[field] === null);
				case 'shippingDataAddress':
					return shippingDataAddressFields.some(field => stepData.address[field] === null);
				case 'shippingDataLogistics':
					return true;
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

	handleAttachmentResolve = (response) => {
		this.setState({
			activeStep: this.getActiveStep(response.data)
		});
	}

	handleAttachmentReject = (error) => {
		console.log(error);
	}

	handleProfileSubmit = (data) => {
		const { orderForm } = this.state;
		const attachmentUrl = `${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/clientProfileData`;
		const attachmentData = {
			...data,
			documentType: 'dni',
			phone: data.phone,
			firstEmail: data.email,
			isCorporate: false
		};

		return axios.post(attachmentUrl, attachmentData)
			.then(this.getOrderForm)
			.then(this.handleAttachmentResolve)
			.catch(this.handleAttachmentReject);
	}

	handleShippingSubmit = (data) => {
		const { orderForm } = this.state;
		const attachmentUrl = `${this.hostUrl}/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`;
		const attachmentData = {
			address: {
				...data,
				country: 'ARG'
			}
		};

		return axios.post(attachmentUrl, attachmentData)
			.then(this.getOrderForm)
			.then(this.handleAttachmentResolve)
			.catch(this.handleAttachmentReject);
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
									initialValues={orderForm.shippingData.address}
									onSubmit={this.handleShippingSubmit}
								/>
							}

							{activeStep === 'shippingLogistics' &&
								<ShippingStepLogistics
									onSubmit={this.handleShippingSubmit}
									logisticsInfo={orderForm.shippingData.logisticsInfo}
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
