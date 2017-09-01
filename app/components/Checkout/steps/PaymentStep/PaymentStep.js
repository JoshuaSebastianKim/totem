import React, { Component } from 'react';
import { object } from 'prop-types';
import _ from 'lodash';

class PaymentStep extends Component {
	static propTypes = {
		orderForm: object.isRequired
	}

	constructor(props) {
		super(props);

		const { orderForm } = props;
		const { paymentData } = orderForm;
		const paymentSystems = this.updatePaymentSystems(paymentData);

		this.state = {
			paymentSystems
		};
	}

	getPaymentSystem = (json) => Object.assign({}, _.omit(json, 'validator'), {
		...json.validator
	})

	getPaymentGroupClass = (groupName) => {

	}

	updatePaymentSystems = (paymentData) => {
		const paymentSystems = this.state ? this.state.paymentSystems : [];
		const newPaymentSystems = paymentData.paymentSystems.map((ps) => {
			let newPs = paymentSystems.find((eps) => eps.id === ps.id);

			if (newPs) {
				newPs = ps;
			} else {
				newPs = this.getPaymentSystem(ps);
			}

			return newPs;
		});

		return newPaymentSystems;
	}

	render() {
		return (
			<div>

			</div>
		);
	}

}

export default PaymentStep;
