import React, { Component } from 'react';
import { array } from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';
import { ArrowRightIcon, ArrowLeftIcon, ShippingIcon, StoreIcon } from '../../../UI/Icons';
import styles from './ShippingStep.scss';

const ShippingOptions = ({ slas, selectedSla, onClick }) => (
	<div className={styles.shippingOptions}>
		{slas.map(sla => (
			<button
				key={sla.id}
				type="button"
				className={`${styles.shippingOption} ${sla.id === selectedSla && styles.shippingOptionActive}`}
				onClick={() => onClick(sla.id)}
			>
				<div className={styles.shippingOptionIcon}>
					{/Retiro en tienda/ig.test(sla.id) &&
						<StoreIcon />
					}

					{/Envio a domicilio/ig.test(sla.id) &&
						<ShippingIcon />
					}
				</div>

				<div className={styles.shippingOptionLabel}>
					{sla.name}
				</div>
			</button>
		))}
	</div>
);

class ShippingStepLogistics extends Component {
	static propTypes = {
		...propTypes,
		logisticsInfo: array.isRequired
	}

	state = {
		selectedSla: null,
		activeSla: null
	}

	componentWillMount() {
		const { logisticsInfo } = this.props;
		const { selectedSla } = logisticsInfo[0];

		this.setActiveSla(selectedSla)
	}

	setActiveSla = (selectedSla) => {
		const { logisticsInfo } = this.props;
		const { slas } = logisticsInfo[0];
		const activeSla = slas.find(sla => sla.id === selectedSla);

		this.setState({
			selectedSla,
			activeSla
		});
	}

	handleShippingOptionClick = (id) => {
		this.setActiveSla(id);
	}

	render() {
		const { selectedSla } = this.state;
		const { handleSubmit, submitting, logisticsInfo } = this.props;
		const { slas } = logisticsInfo[0];

		return (
			<form onSubmit={handleSubmit} className={styles.logisticsInfo}>
				<div className={styles.logisticsInfoTitle}>
					Modo de entrega
				</div>

				<ShippingOptions
					slas={slas}
					selectedSla={selectedSla}
					onClick={this.handleShippingOptionClick}
				/>

				<div className={styles.shippingSchedule}>
				</div>

				<div className={styles.submitContainer}>
					<button type="button" className={styles.back}>
						<ArrowLeftIcon className={styles.backIcon} />

						<span className={styles.backLabel}>
							Atrás
						</span>
					</button>

					<button type="submit" disabled={submitting} className={styles.submit}>
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
	form: 'shipping',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(ShippingStepLogistics);
