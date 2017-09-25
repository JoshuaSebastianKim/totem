import React, { PureComponent } from 'react';
import { string, bool } from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import styles from './CustomField.scss';

class CustomField extends PureComponent {
	componentDidMount() {
		if (this.props.autofocus) {
			this.inputDOM.focus();
		}
	}
	render() {
		const {
			className,
			onFocusInput,
			name,
			input,
			label,
			type,
			meta: { touched, error, warning, submitting }
		} = this.props;

		return (
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
						ref={i => { this.inputDOM = i; }}
					/>

					{touched && (
						(error && <span className={styles.error}>{error}</span>) ||
						(warning && <span className={styles.warning}>{warning}</span>)
					)}
				</div>
			</div>
		);
	}

}

CustomField.propTypes = {
	...fieldPropTypes,
	className: string,
	autofocus: bool
};

CustomField.defaultProps = {
	className: '',
	autofocus: false
};

export default CustomField;
