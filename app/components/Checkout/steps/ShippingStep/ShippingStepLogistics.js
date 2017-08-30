import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { Field, reduxForm, propTypes, change } from 'redux-form';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import * as withLogisticsInfo from './logisticsInfo';
import ShippingOptions from './ShippingOptions';
import ShippingDate from './ShippingDate';
import ShippingWindow from './ShippingWindow';
import { ArrowRightIcon, ArrowLeftIcon } from '../../../UI/Icons';
import styles from './ShippingStep.scss';

class ShippingStepLogistics extends Component {
	static propTypes = {
		...propTypes,
		orderForm: object.isRequired,
		onBack: func.isRequired
	}

	constructor(props) {
		super(props);

		const { items, sellers } = props.orderForm;
		const { logisticsInfo } = props.orderForm.shippingData;
		const shippingOptions = withLogisticsInfo.getShippingOptionsData(logisticsInfo, items, sellers);
		const [defaultShippingOption] = shippingOptions;
		const { deliveryWindow } = defaultShippingOption.selectedSla;
		const selectedDate = deliveryWindow ? moment(deliveryWindow.formattedDate, 'DD/MM/YYYY') : null;

		this.state = {
			logisticsInfo,
			sellers,
			shippingOptions,
			selectedDate,
			items: items.map((item, index) => Object.assign({}, item, { index }))
		};
	}

	componentWillMount() {
		const { logisticsInfo, deliveryWindow } = this.state;

		this.props.change('logisticsInfo', logisticsInfo);
		this.props.change('deliveryWindow', deliveryWindow);
	}

	handleShippingOptionClick = (id) => {
		const { logisticsInfo, shippingOptions, items, sellers } = this.state;
		const updatedLogisticsInfo = withLogisticsInfo.updateLogisticsInfoModel(logisticsInfo, shippingOptions[0], id);
		const updatedShippingOptions = withLogisticsInfo.getShippingOptionsData(updatedLogisticsInfo, items, sellers);

		this.setState({
			logisticsInfo: updatedLogisticsInfo,
			shippingOptions: updatedShippingOptions
		});
	}

	handleDatePickerChange = (date) => {
		this.setState({
			selectedDate: date
		});
	}

	handleDeliveryWindowChange = (deliveryWindow) => {
		if (deliveryWindow.isWindowSelected) {
			return;
		}

		const { shippingOptions, logisticsInfo } = this.state;
		const [defaultShippingOption] = shippingOptions;
		const selectedSla = defaultShippingOption.slas.find(sla => sla.id === defaultShippingOption.selectedSla.id);
		const updatedShippingOptions = Object.assign({}, defaultShippingOption, {
			selectedSla: withLogisticsInfo.selectDeliveryWindow(selectedSla, deliveryWindow)
		});

		this.props.change('logisticsInfo', logisticsInfo);
		this.props.change('deliveryWindow', deliveryWindow);

		this.setState({
			shippingOptions: [updatedShippingOptions]
		});
	}

	render() {
		const { shippingOptions, selectedDate } = this.state;
		const { handleSubmit, submitting, onBack } = this.props;
		const [defaultShippingOption] = shippingOptions;
		const { slas } = defaultShippingOption;
		const selectedSla = slas.find(sla => sla.id === defaultShippingOption.selectedSla.id);
		const { deliveryWindows } = slas.find(sla => sla.id === selectedSla.id);
		const includeDates = Object.keys(deliveryWindows).map((date) => moment(date, 'YYYY/M/DD'));
		const dateDeliveryWindows = selectedDate ? selectedSla.deliveryWindows[selectedDate.format('YYYY/M/DD')] : null;
		const selectedDeliveryWindow = dateDeliveryWindows != null && dateDeliveryWindows.find(dw => dw.isWindowSelected);

		return (
			<form onSubmit={handleSubmit} className={styles.logisticsInfo}>
				<div className={styles.logisticsInfoTitle}>
					Modo de entrega
				</div>

				<ShippingOptions
					slas={slas}
					selectedSla={selectedSla.id}
					onClick={this.handleShippingOptionClick}
				/>

				<div className={styles.shippingSchedule}>
					<ShippingDate
						selectedDate={selectedDate}
						includeDates={includeDates}
						onDatePickerChange={this.handleDatePickerChange}
					/>

					<ShippingWindow
						deliveryWindows={dateDeliveryWindows}
						onDeliveryWindowChange={this.handleDeliveryWindowChange}
					/>
				</div>

				<Field
					name="logisticsInfo"
					component="input"
					type="hidden"
				/>

				<Field
					name="deliveryWindow"
					component="input"
					type="hidden"
				/>

				<div className={styles.submitContainer}>
					<button type="button" className={styles.back} onClick={onBack}>
						<ArrowLeftIcon className={styles.backIcon} />

						<span className={styles.backLabel}>
							Atrás
						</span>
					</button>

					<button type="submit" disabled={submitting || !selectedDeliveryWindow} className={styles.submit}>
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
