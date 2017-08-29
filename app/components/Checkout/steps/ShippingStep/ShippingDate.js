import React from 'react';
import DatePicker from 'react-datepicker';
import { array, object, func } from 'prop-types';
import { CalendarIcon } from '../../../UI/Icons';
import styles from './ShippingStep.scss';

const ShippingDate = ({ selectedDate, includeDates, onDatePickerChange }) => (
	<div className={styles.shippingDate}>
		<div className={styles.shippingDateTitle}>
			<CalendarIcon className={styles.shippingDateTitleIcon} />

			<span className={styles.shippingDateTitleLabel}>
				fecha de entrega
			</span>
		</div>

		<div className={styles.datePicker}>
			<DatePicker
				inline
				selected={selectedDate}
				includeDates={includeDates}
				onChange={onDatePickerChange}
			/>
		</div>
	</div>
);

ShippingDate.propTypes = {
	selectedDate: object,
	includeDates: array.isRequired,
	onDatePickerChange: func
};

ShippingDate.defaultProps = {
	selectedDate: {},
	onDatePickerChange: () => null
};

export default ShippingDate;
