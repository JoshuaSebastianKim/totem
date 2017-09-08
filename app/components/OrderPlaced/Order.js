import React from 'react';
import OrderData from './OrderData';
import OrderItems from './OrderItems';
import OrderTotalizers from './OrderTotalizers';
import styles from './Order.scss';

type Props = {
	order: object
};

const Order = ({ order }: Props) => (
	<div className={styles.container}>
		<OrderData
			orderId={order.orderId}
			shippingData={order.shippingData}
			paymentData={order.paymentData}
		/>

		<OrderItems items={order.items} />

		<OrderTotalizers total={order.value} totalizers={order.totals} />
	</div>
);

export default Order;
