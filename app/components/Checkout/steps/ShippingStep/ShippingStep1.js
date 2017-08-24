import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import CustomField from '../CustomField';
import CustomSelect from '../CustomSelect';
import { ArrowRightIcon } from '../../../UI/Icons';
import { required, isNumber } from '../../../../utils/validations';
import map from './map.json';
import styles from './ShippingStep.scss';

class ShippingStep extends Component {
	static propTypes = {
		...propTypes
	}

	state = {
		state: '',
		cities: []
	}

	componentWillMount() {
		const { initialValues } = this.props;

		if ('city' in initialValues) {
			this.setStateLocation(initialValues.state);
		}
	}

	handleStateChange = event => {
		const state = event.target.value;

		this.setStateLocation(state);
	}

	setStateLocation = (state) => {
		const cities = (state in map) ? Object.keys(map[state]) : [];

		this.setState({
			state,
			cities
		});
	}

	render() {
		const { cities } = this.state;
		const { handleSubmit, submitting } = this.props;

		return (
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.fields}>
					<Field
						name="postalCode"
						label="Código Postal"
						component={CustomField}
						validate={[required, isNumber]}
						className={styles.postalCode}
					/>

					<Field
						name="street"
						label="Calle"
						component={CustomField}
						validate={[required]}
						className={styles.street}
					/>

					<Field
						name="number"
						label="Número"
						component={CustomField}
						validate={[required, isNumber]}
						className={styles.number}
					/>

					<Field
						name="complement"
						label="Piso o Depto."
						component={CustomField}
						className={styles.complement}
					/>

					<Field
						name="state"
						label="Provincia"
						component={CustomSelect}
						validate={[required]}
						values={Object.keys(map)}
						onChange={this.handleStateChange}
						className={styles.state}
					/>

					<Field
						name="city"
						label="Ciudad"
						component={CustomSelect}
						validate={[required]}
						values={cities}
						className={styles.city}
					/>

					<Field
						name="receiverName"
						label="Nombre de la persona que va a recibir"
						component={CustomField}
						validate={[required]}
						className={styles.receiverName}
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
	form: 'shipping'
})(ShippingStep);
