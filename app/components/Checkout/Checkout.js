import React, { Component } from 'react';
import { array, number } from 'prop-types';
import styles from './Checkout.scss';

class Checkout extends Component {
	static propTypes = {
		items: array,
		saleChannel: number
	}

	static defaultProps = {
		items: ['14', '11', '9', '2'],
		saleChannel: 25
	}

	componentDidMount() {
		this.iframe.src = this.getCheckoutUrl();
		this.iframe.onload = () => {
			console.log('LOADED');
		};
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
