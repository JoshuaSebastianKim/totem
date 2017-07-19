import React, { Component } from 'react';
import $ from 'jquery';
import { array, number } from 'prop-types';
import { Spinner } from '../UI';
import { iframeReady } from '../../utils';
import styles from './Checkout.scss';

window.$ = $;

class Checkout extends Component {
	static propTypes = {
		items: array,
		saleChannel: number
	}

	static defaultProps = {
		items: ['14', '11', '9', '2'],
		saleChannel: 25
	}

	state = {
		loading: true
	}

	componentDidMount() {
		this.iframe.src = this.getCheckoutUrl();
		this.iframe.onload = this.onCheckoutIframeLoad();
	}

	onCheckoutIframeLoad = () => {
		this.setState({
			loading: false
		});

		iframeReady(this.iframe, this.handleIframeReady);
	}

	handleIframeReady = () => {
		const { contentWindow } = this.iframe;

		contentWindow.$('#payment-data')
			.one('componentValidated.vtex', this.onPaymentDataEnabled);
	}

	onPaymentDataEnabled = () => {
		const { contentWindow } = this.iframe;

		this.creditCardIframe = contentWindow.$('#iframe-placeholder-creditCardPaymentGroup iframe')[0];

		try {
			iframeReady(this.creditCardIframe, this.handleCreditCartIframeReady);
		} catch (e) {
			console.log(e);
			setTimeout(this.onPaymentDataEnabled, 1);
		}
	}

	handleCreditCartIframeReady = () => {
		console.log('credit card ready');
		const { contentWindow } = this.iframe;
		const DOM = contentWindow.frames[0].document;
		console.log(DOM);
		const cardFormDOM = DOM.getElementsByClassName('CardForm')[0];

		DOM.addEventListener('animationend', (event) => {
			console.log(event);
		});

		// cardFormDOM.addEventListener('animationend', () => {
		// 	const inputs = contentWindow.frames[0].document.getElementsByTagName('input');
		// 	inputs[0].addEventListener('focus', console.log)
		// });
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
