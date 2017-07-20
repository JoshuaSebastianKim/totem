import React, { Component } from 'react';
import { array, number, func } from 'prop-types';
import { Spinner } from '../UI';
import { iframeReady } from '../../utils';
import styles from './Checkout.scss';

class Checkout extends Component {
	static propTypes = {
		items: array,
		saleChannel: number,
		onFocusInput: func
	}

	static defaultProps = {
		items: ['14', '11', '9', '2'],
		saleChannel: 25,
		onFocusInput: () => null
	}

	state = {
		loading: true
	}

	componentDidMount() {
		this.iframe.src = this.getCheckoutUrl(); // Create iframe
		this.iframe.onload = this.onCheckoutIframeLoad(); // Onload handler
		this.iframe.onload = console.log; // Onload handler
	}

	onCheckoutIframeLoad = () => {
		this.setState({
			loading: false
		});

		// On ready iframe
		// NOTE: The "iframeReady" function callbacks when the iframe is really
		// ready since an iframe loads 2 times, once with an "about:black" and
		// then with the real page. That's why we can't use "load" handlers.
		iframeReady(this.iframe, this.handleIframeReady);
	}

	handleIframeReady = () => {
		console.log('IFRAME READY');
		const { contentWindow } = this.iframe;

		// NOTE: The "componentValidated" event only triggers in the same instace
		// of jQuery that's is why I use the jQuery from "contentWindow" of the
		// checkout frame.
		contentWindow.$('#payment-data')
			.on('componentValidated.vtex', this.onPaymentDataEnabled);
	}

	onPaymentDataEnabled = () => {
		const { contentWindow } = this.iframe;

		this.creditCardIframe = contentWindow.$('#iframe-placeholder-creditCardPaymentGroup iframe')[0];

		// NOTE: In this frame the ready checker function for the iframe tends
		// to fail, if so try again until it works and it should.
		try {
			iframeReady(this.creditCardIframe, this.handleCreditCartIframeReady);
		} catch (e) {
			setTimeout(this.onPaymentDataEnabled.bind(this), 100);
		}
	}

	handleCreditCartIframeReady = () => {
		this.bindCreditCartInputsFocus();
	}

	bindCreditCartInputsFocus = () => {
		const inputs = window.frames[0].frames[0].document.getElementsByTagName('input');

		if (!inputs.length) {
			return setTimeout(this.bindCreditCartInputsFocus.bind(this), 100);
		}

		// When the inputs are found bind the focus event for the keyboard
		Array.from(inputs).forEach((input) => {
			input.addEventListener('focus', this.handleInputFocus);

			// Change the credit card number input type
			if (input.id === 'creditCardpayment-card-0Number') {
				Object.assign(input, { type: 'password' });
			}

			if (input.id === 'creditCardpayment-card-0Code') {
				Object.assign(input, { type: 'text' });
			}
		});
	}

	handleInputFocus = (event) => {
		this.props.onFocusInput(event.target);
	}

	getCheckoutUrl() {
		const { items, saleChannel } = this.props;
		const base = 'http://totemwalmartarqa.vtexcommercestable.com.br/checkout/cart/add';
		const params = items.map(item => `sku=${item}&qty=1&seller=1`).join('&');

		return `${base}?${params}&sc=${saleChannel}`;
	}

	render() {
		return (
			<div className={styles.container}>
				{this.state.loading &&
					<div className={styles.spinnerContainer}>
						<Spinner className={styles.spinner} />
					</div>
				}

				<iframe
					className={styles.iframe}
					sandbox="allow-scripts allow-same-origin allow-forms"
					title="checkout"
					ref={iframe => { this.iframe = iframe; }}
				/>
			</div>
		);
	}
}

export default Checkout;
