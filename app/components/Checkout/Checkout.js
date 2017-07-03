import React, { Component } from 'react';
import styles from './Checkout.scss';

class Checkout extends Component {
	componentDidMount() {
		this.iframe.src = 'http://walmartarqa.vtexcommercestable.com.br/';

		this.iframe.onload = () => {
			console.log('LOADED')
		}
		console.log(this.iframe.contentWindow);
	}

	render() {
		return (
			<div className={styles.container}>
				<iframe
					className={styles.iframe}
					title="checkout"
					ref={iframe => { this.iframe = iframe; }}
				/>
			</div>
		);
	}
}

export default Checkout;
