import React, { Component } from 'react';
import { Redirect } from 'react-router';
import OrderPlacedHeader from './OrderPlacedHeader';
import OrderPlacedMessage from './OrderPlacedMessage';
import Order from './Order';
import styles from './OrderPlaced.scss';

type Props = {
	orders: Array<any>,
	onClearCart: () => void,
	onPrintOrderTicket: (any) => void,
	onDestroyForms: () => void
};

class OrderPlaced extends Component {
	props: Props;

	componentWillMount() {
		const { onClearCart, onPrintOrderTicket, onDestroyForms, orders } = this.props;
		const [order] = orders;

		onClearCart();
		onPrintOrderTicket(order);
		onDestroyForms();
	}

	render() {
		const { orders } = this.props;
		const [order] = orders;

		if (orders.length === 0) {
			return <Redirect to="/" />;
		}

		return (
			<div className={styles.container}>
				<OrderPlacedHeader />

				<OrderPlacedMessage email={order.clientProfileData.email} />

				<Order order={order} />
			</div>
		);
	}

}

export default OrderPlaced;
