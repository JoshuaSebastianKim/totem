import React from 'react';
import { string } from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import styles from './CustomField.scss';

const CustomField = ({
	className,
	onFocusInput,
	name,
	input,
	label,
	type,
	meta: { touched, error, warning, submitting }
}) => (
	<div className={`${styles.field} ${className}`}>
		<label htmlFor={name} className={styles.label}>
			{label}
		</label>

		<div id={name} className={styles.inputContainer}>
			<input
				{...input}
				type={type}
				disabled={submitting}
				className={styles.input}
				onFocus={ev => onFocusInput(ev.target)}
			/>

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
