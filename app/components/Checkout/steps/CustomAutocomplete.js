import React from 'react';
import { string } from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import Autocomplete from 'react-autocomplete';
import styles from './CustomField.scss';

function matchStateToTerm(state, value) {
	return (
		state.value.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
		state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
	);
}

function sortStates(a, b, value) {
	const aLower = a.value.toLowerCase()
	const bLower = b.value.toLowerCase()
	const valueLower = value.toLowerCase()
	const queryPosA = aLower.indexOf(valueLower)
	const queryPosB = bLower.indexOf(valueLower)
	if (queryPosA !== queryPosB) {
		return queryPosA - queryPosB;
	}
	return aLower < bLower ? -1 : 1;
}

console.log(styles.menu);

const CustomAutocomplete = ({
	className,
	items,
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
			<Autocomplete
				{...input}
				inputProps={{
					type,
					disabled: submitting,
					onFocus: ev => onFocusInput(ev.target),
					className: styles.input
				}}
				renderMenu={(children, value, style) => (
					<div
						style={{ ...style }}
						className={styles.menu}
					>
						{children}
					</div>
				)}
				renderItem={(item, isHighlighted) => (
					<div
						key={item.value}
						style={{ background: isHighlighted ? 'lightgray' : 'white' }}
						className={styles.item}
					>
						{item.label}
					</div>
				)}
				shouldItemRender={matchStateToTerm}
				// sortItems={sortStates}
				getItemValue={item => item.value}
				items={items}
				onSelect={value => input.onChange(value)}
			/>

			{touched && (
				(error && <span className={styles.error}>{error}</span>) ||
				(warning && <span className={styles.warning}>{warning}</span>)
			)}
		</div>
	</div>
);

CustomAutocomplete.propTypes = {
	...fieldPropTypes,
	className: string
};

CustomAutocomplete.defaultProps = {
	className: ''
};

export default CustomAutocomplete;
