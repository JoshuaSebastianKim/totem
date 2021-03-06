import React, { Component } from 'react';
import { func } from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';
import { ArrowRightIcon } from '../../../UI/Icons';
import CustomField from '../CustomField';
import { required, isEmail, isNumber, minLength8 } from '../../../../utils/validations';
import styles from './ProfileStep.scss';

class ProfileStep extends Component {
	static propTypes = {
		...propTypes,
		onFocusInput: func.isRequired
	}

	render() {
		const { handleSubmit, submitting, onFocusInput } = this.props;

		return (
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.fields}>
					<Field
						name="email"
						label="Mail"
						component={CustomField}
						validate={[required, isEmail]}
						className={styles.email}
						onFocusInput={onFocusInput}
						autofocus
					/>

					<Field
						name="firstName"
						label="Nombre"
						component={CustomField}
						validate={[required]}
						className={styles.firstName}
						onFocusInput={onFocusInput}
					/>

					<Field
						name="lastName"
						label="Apellidos"
						component={CustomField}
						validate={[required]}
						className={styles.lastName}
						onFocusInput={onFocusInput}
					/>

					<Field
						name="document"
						label="DNI"
						component={CustomField}
						validate={[required, isNumber, minLength8]}
						className={styles.document}
						onFocusInput={onFocusInput}
					/>

					<Field
						name="phone"
						label="Teléfono"
						component={CustomField}
						validate={[required, isNumber, minLength8]}
						className={styles.phone}
						onFocusInput={onFocusInput}
					/>
				</div>

				<div className={styles.submitContainer}>
					<button
						type="submit"
						disabled={submitting}
						className={styles.submit}
					>
						<span className={styles.submitLabel}>
							Siguiente
						</span>

						<ArrowRightIcon className={styles.submitIcon} />
					</button>
				</div>
			</form>
		);
	}

}

export default reduxForm({
	form: 'profile'
})(ProfileStep);
