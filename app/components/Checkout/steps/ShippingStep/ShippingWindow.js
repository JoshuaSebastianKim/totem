import React from 'react';
import { array, func } from 'prop-types';
import { CheckIcon, TimeIcon } from '../../../UI/Icons';
import styles from './ShippingStep.scss';

const ShippingWindow = ({ deliveryWindows, onDeliveryWindowChange }) => (
	<div className={styles.shippingWindow}>
		<div className={styles.shippingWindowTitle}>
			<TimeIcon className={styles.shippingWindowTitleIcon} />

			<span className={styles.shippingWindowTitleLabel}>
				hora de entrega
			</span>
		</div>

		{deliveryWindows ?
			<div className={styles.deliveryWindows}>
				{deliveryWindows.map(dw => (
					<button
						key={dw.startDateUtc}
						type="button"
						className={`${styles.deliveryWindow} ${dw.isWindowSelected && styles.deliveryWindowSelected}`}
						onClick={() => onDeliveryWindowChange(dw)}
					>
						<span className={styles.deliveryWindowLabel}>
							{dw.label}
						</span>

						<CheckIcon className={styles.deliveryWindowRadio} />
					</button>
				))}
			</div> :
			<div className={styles.datePendingMessage}>
				Selecciona una fecha de entrega
			</div>
		}
	</div>
);

ShippingWindow.propTypes = {
	deliveryWindows: array,
	onDeliveryWindowChange: func
};

ShippingWindow.defaultProps = {
	deliveryWindows: [],
	onDeliveryWindowChange: () => null
};

export default ShippingWindow;
