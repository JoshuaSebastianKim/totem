import React, { Component } from 'react';
import { Redirect } from 'react-router';
import OrderPlacedHeader from './OrderPlacedHeader';
import OrderPlacedMessage from './OrderPlacedMessage';
import Order from './Order';
import styles from './OrderPlaced.scss';

type Props = {
	orders: Array<any>
};

class OrderPlaced extends Component {
	props: Props;

	render() {
		const { orders } = this.props;
		const [order] = orders;

		console.log(orders);
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
