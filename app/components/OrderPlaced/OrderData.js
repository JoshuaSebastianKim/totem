import React from 'react';
import moment from 'moment';
import { Price } from '../UI';
import { UserIcon, LocationIcon, CardIcon } from '../UI/Icons';
import styles from './OrderData.scss';

type Props = {
	orderId: string,
	shippingData: object,
	paymentData: object
};

function getDeliveryTime(shippingData) {
	const { selectedSla } = shippingData.logisticsInfo[0];
	const { deliveryWindow } = shippingData.logisticsInfo[0].slas.find(sla => sla.id === selectedSla);
	const startDate = moment(deliveryWindow.startDateUtc).utcOffset(0);
	const endDate = moment(deliveryWindow.endDateUtc).utcOffset(0);
	const deliveryDate = startDate.format('DD/MM/YYYY');
	const deliverStartTime = startDate.format('HH:mm');
	const deliverEndTime = endDate.format('HH:mm');
	const deliveryTime = `${deliveryDate} ${deliverStartTime}hs - ${deliverEndTime}hs`;

	return deliveryTime;
}

function getPaymentLabel(paymentData) {
	const [payment] = paymentData.payments;

	switch (payment.group) {
		case 'creditCard':
			return `Tarjeta de Crédito ${payment.paymentSystemName} terminada en ${payment.lastDigits}`;
		case 'promissory':
			return 'Pago en tienda';
		default:
			return payment.paymentSystemName;
	}
}

const OrderData = ({ orderId, shippingData, paymentData }: Props) => (
	<div className={styles.container}>
		<div className={styles.dataContainer}>
			<UserIcon className={`${styles.icon} ${styles.userIcon}`} />

			<div className={styles.data}>
				<div className={styles.label}>
					Pedido:
				</div>

				<div className={styles.value}>
					{orderId}
				</div>
			</div>
		</div>

		<div className={styles.dataContainer}>
			<LocationIcon className={`${styles.icon} ${styles.locationIcon}`} />

			<div className={styles.data}>
				<div className={styles.label}>
					Método de Entrega:
				</div>

				<div className={styles.value}>
					{shippingData.logisticsInfo[0].selectedSla}
					<br />
					{getDeliveryTime(shippingData)}
				</div>
			</div>
		</div>

		<div className={styles.dataContainer}>
			<CardIcon className={`${styles.icon} ${styles.cardIcon}`} />

			<div className={styles.data}>
				<div className={styles.label}>
					Método de Pago:
				</div>

				<div className={styles.value}>
					{getPaymentLabel(paymentData)}

					<Price price={paymentData.payments[0].value / 100} />
				</div>
			</div>
		</div>
	</div>
)

export default OrderData;
