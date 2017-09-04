import React from 'react';
import { array, func, string } from 'prop-types';
import { Button } from '../../../UI/Buttons';
import styles from './PaymentGroups.scss';

const PaymentGroups = ({ paymentGroups, selectedPaymentGroupName, onClick }) => (
	<div className={styles.container}>
		{paymentGroups.map(pg => (
			<Button
				key={pg.groupName}
				className={`${styles.paymentGroup} ${pg.groupName === selectedPaymentGroupName && styles.activePaymentGroup}`}
				onClick={() => onClick(pg.groupName)}
			>
				<span className={styles.icon}>
					{pg.icon &&
						<pg.icon.Component
							style={pg.icon.style}
						/>
					}
				</span>

				<span className={styles.label}>
					{pg.label}
				</span>
			</Button>
		))}
	</div>
);

PaymentGroups.propTypes = {
	paymentGroups: array.isRequired,
	selectedPaymentGroupName: string.isRequired,
	onClick: func.isRequired
};

export default PaymentGroups;
