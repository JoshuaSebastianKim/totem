import React from 'react';
import { string } from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import styles from './CustomField.scss';

const CustomField = ({
	className,
	values,
	name,
	input,
	label,
	meta: { touched, error, warning, submitting }
}) => (
	<div className={`${styles.field} ${className}`}>
		<label htmlFor={name} className={styles.label}>
			{label}
		</label>

		<div id={name} className={styles.inputContainer}>
			<select {...input} disabled={submitting} className={styles.select}>
				<option value="" />
				{values.map(option => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</select>

			{touched && (
				(error && <span className={styles.error}>{error}</span>) ||
				(warning && <span className={styles.warning}>{warning}</span>)
			)}
		</div>
	</div>
);

CustomField.propTypes = {
	...fieldPropTypes,
	className: string
};

CustomField.defaultProps = {
	className: ''
};

export default CustomField;
