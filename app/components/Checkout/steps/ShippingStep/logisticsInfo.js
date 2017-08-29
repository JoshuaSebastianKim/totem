import _ from 'lodash';

// UTILS
_.plainChars = function (str) {
	if (str !== null) {
		const specialChars = 'ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź';
		const plain = 'aaaaaaaaceeeeeiiiilnoooooosuuuunczz';
		const regex = new RegExp(`[${specialChars}]`, 'g');

		return str.replace(regex, (char) => plain.charAt(specialChars.indexOf(char)));
	}
};

_.formatCurrency = function (value, options) {
	const defaults = {
		decimalSeparator: ',',
		thousandsSeparator: '.',
		absolute: false,
		decimalPlaces: 2
	};
	const opts = Object.assign({}, defaults, options);
	let formattedValue = value;

	if (opts.absolute && value < 0) {
		formattedValue = Math.abs(value);
	}

	formattedValue = formattedValue.toFixed(opts.decimalPlaces);

	let [wholePart, decimalPart] = formattedValue.split('.');
	wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, opts.thousandsSeparator);

	return opts.decimalPlaces > 0 ? wholePart + opts.decimalSeparator + decimalPart : wholePart;
};

_.intAsCurrency = function (value, options = null) {
	return (
		(options !== null ? options.currencySymbol : undefined) || '$')
		+ _.formatCurrency(value / 100, options
	);
};

_.pad = function (str, max, options) {
	const defaults = {
		char: '0',
		position: 'left'
	};
	const opts = Object.assign({}, defaults, options);
	opts.char = opts.char.charAt(0);
	const toadd = Array((max - String(str).length) + 1).join(opts.char);

	return opts.position === 'right' ? str + toadd : toadd + str;
};

// FORMAT
function formatDate(date) {
	const year = date.getUTCFullYear();
	let month = date.getUTCMonth() + 1;
	let day = date.getUTCDate();

	if (parseInt(day, 10) < 10) {
		day = `0${day}`;
	}
	if (parseInt(month, 10) < 10) {
		month = `0${month}`;
	}

	return `${day}/${month}/${year}`;
}

function formatDateAsArray(date) {
	return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
}

function formatDateAsString(date) {
	return `${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()}`;
}

function mapLogisticsInfo(logisticsInfo, items, sellers) {
	const newLogisticsInfo = _.map(logisticsInfo, (logisticItem) => {
		const newLogisticItem = {
			itemIndex: logisticItem.itemIndex,
			itemId: logisticItem.itemId,
			selectedSla: logisticItem.selectedSla,
			shipsTo: logisticItem.shipsTo != null
				? logisticItem.shipsTo.slice(0)
				: undefined,
			slas: logisticItem.slas.map(sla => ({
				id: sla.id,
				listPrice: sla.listPrice,
				name: sla.name,
				price: sla.price,
				shippingEstimate: sla.shippingEstimate,
				shippingEstimateDate: sla.shippingEstimateDate,
				deliveryWindow: Object.assign({}, sla.deliveryWindow),
				tax: sla.tax,
				availableDeliveryWindows: sla.availableDeliveryWindows.map(dw => Object.assign({}, dw))
			})),
			item: items[logisticItem.itemIndex],
			seller: sellers.find(seller => String(seller.id) === String(items[logisticItem.itemIndex].seller))
		};

		return newLogisticItem;
	});

	return newLogisticsInfo;
}

function fillSLA(index, sla, sellerId, selectedSla) {
	const filledSla = Object.assign({}, sla, { shippingOptionsIndex: index });

	if (filledSla.availableDeliveryWindows && filledSla.availableDeliveryWindows.length > 0) {
		const defaultWindow = filledSla.availableDeliveryWindows[0];

		filledSla.isScheduled = true;
		filledSla.hasPriceVariation = _.some(filledSla.availableDeliveryWindows, (win) => {
			const isPriceAndTaxZero = win.price === 0 && win.tax === 0;
			const isPriceAndTaxEqual = win.price === defaultWindow.price && win.tax === defaultWindow.tax;

			return !(isPriceAndTaxZero || isPriceAndTaxEqual);
		});
	}

	filledSla.businessDays = filledSla.shippingEstimate.indexOf('bd') !== -1;
	filledSla.shippingEstimateDays = parseInt(filledSla.shippingEstimate.replace(/bd|d/, ''), 10);
	filledSla.nameAttr = _.plainChars(`seller-${sellerId}`);
	filledSla.idAttr = _.plainChars(`${filledSla.nameAttr}-sla-${filledSla.id !== null
		? sla.id.replace(/\s/g, '')
		: ''}`);

	if (filledSla.id === selectedSla) {
		filledSla.isSelected = true;
	} else {
		filledSla.isSelected = false;
	}

	return filledSla;
}

function fillLogisticsInfo(logisticsInfoBySeller) {
	let index = 0;
	const logisticsInfoArray = _.map(logisticsInfoBySeller, (logisticsInfo) => {
		const composedLogistic = {
			items: [],
			seller: {},
			selectedSla: '',
			slas: [],
			index
		};

		_.each(logisticsInfo, (info) => {
			composedLogistic.items.push(info.item);
			composedLogistic.seller = info.seller;

			_.each(info.slas, (sla) => {
				let composedSla = _.find(composedLogistic.slas, _sla => _sla.id === sla.id);

				if (!composedSla) {
					composedSla = fillSLA(index, sla, info.seller.id, info.selectedSla);
					composedLogistic.slas.push(composedSla);
				} else {
					composedSla.price += sla.price;
					composedSla.tax += sla.tax;
				}
			});

			composedLogistic.selectedSla = _.find(composedLogistic.slas, slas => slas.id === info.selectedSla);
		});

		index += 1;

		return composedLogistic;
	});

	return logisticsInfoArray;
}

function fillScheduled(logisticsInfoArray) {
	return logisticsInfoArray.map(li => Object.assign({}, li, {
		slas: li.slas.map((sla) => {
			if (sla.isScheduled) {
				const formattedSla = Object.assign({}, sla, {
					deliveryDates: getDeliveryDates(sla.availableDeliveryWindows),
					deliveryWindows: _.groupBy(sla.availableDeliveryWindows, (dw) => formatDateAsString(new Date(dw.startDateUtc)))
				});
				let labeledSla = updateDeliveryWindowsPriceAndLabels(formattedSla);

				if (labeledSla.deliveryWindow) {
					labeledSla = selectDeliveryWindow(labeledSla, labeledSla.deliveryWindow);
				}

				return labeledSla;
			}

			return sla;
		})
	}));
}

function getDeliveryDates(deliveryWindows) {
	return _.reduce(deliveryWindows, (deliveryDates, dw) => {
		const date = new Date(dw.startDateUtc);
		const dateAsArray = formatDateAsArray(date);
		const dateIsInArray = _.find(deliveryDates,
			(d) => d[0] === dateAsArray[0] && d[1] === dateAsArray[1] && d[2] === dateAsArray[2]
		);

		if (!dateIsInArray) {
			deliveryDates.push(dateAsArray);
		}

		return deliveryDates;
	}, []);
}

function getCheapestSla(so) {
	let cheapestValue = Number.MAX_VALUE;
	let cheapestSla = null;

	so.slas.forEach(sla => {
		if (sla.price < cheapestValue) {
			cheapestSla = sla;
			cheapestValue = sla.price;
		}
	});

	return cheapestSla;
}

function setCheapestSlaIfNull(shippingOptions) {
	return shippingOptions.map((so) => {
		if (so.selectedSla === null) {
			const cheapestSla = getCheapestSla(so);

			if (!cheapestSla) {
				return so;
			}

			return Object.assign({}, so, { selectedSla: cheapestSla });
		}

		return so;
	});
}

function dateHourMinLabel(date) {
	if (date) {
		return `${_.pad(date.getUTCHours(), 2)}:${_.pad(date.getUTCMinutes(), 2)}`;
	}
}

function updateDeliveryWindowsPriceAndLabels(sla) {
	const labeledSla = Object.assign({}, sla, {
		cheapestValue: sla.cheapestValue || Number.MAX_VALUE,
		isFree: 'Gratis'
	});

	Object.keys(sla.deliveryWindows).forEach((date) => {
		const dateArray = sla.deliveryWindows[date];

		const deliveryWindows = dateArray.map((dw) => {
			const labeledDw = Object.assign({}, dw);
			const value = dw.price + sla.price;
			const startDate = new Date(dw.startDateUtc);
			const endDate = new Date(dw.endDateUtc);
			const startDateTime = dateHourMinLabel(startDate, 2);
			const endDateTime = dateHourMinLabel(endDate, 2);

			if (value === 0) {
				labeledDw.valueLabel = 'Gratis';
			} else {
				labeledSla.isFree = false;
				labeledDw.valueLabel = _.intAsCurrency(value);
			}

			labeledDw.startDate = startDate;
			labeledDw.endDate = endDate;
			labeledDw.dateAsArray = formatDateAsArray(startDate);
			labeledDw.dateString = formatDateAsString(startDate);
			labeledDw.timeLabel = `Desde las ${startDateTime} hasta las ${endDateTime}`;
			labeledDw.label = `${labeledDw.timeLabel} - ${labeledDw.valueLabel}`;
			labeledDw.formattedDate = formatDate(startDate);

			if (value < labeledSla.cheapestValue) {
				labeledSla.cheapestDeliveryWindow = labeledDw;
				labeledSla.cheapestValue = value;
				labeledSla.cheapestValueLabel = labeledDw.valueLabel;
				labeledSla.cheapestEndDate = labeledDw.endDate;
			}

			return labeledDw;
		});

		labeledSla.deliveryWindows[date] = deliveryWindows;
	});

	return labeledSla;
}

export function selectDeliveryWindow(sla, deliveryWindow) {
	const selectedSla = Object.assign({}, sla, {
		deliveryWindow
	});

	Object.keys(sla.deliveryWindows).forEach((date) => {
		const dateAsArray = sla.deliveryWindows[date].map((dw) => {
			const dateWindow = Object.assign({}, dw);

			if (deliveryWindow.startDateUtc === dw.startDateUtc && deliveryWindow.endDateUtc === dw.endDateUtc) {
				dateWindow.isWindowSelected = true;

				selectedSla.deliveryWindow.formattedDate = dw.formattedDate;
				selectedSla.deliveryWindow.label = dw.label;

				selectedSla.deliveryWindowsForDate = dw;
			} else {
				dateWindow.isWindowSelected = false;
			}

			return dateWindow;
		});

		selectedSla.deliveryWindows[date] = dateAsArray;
	});

	return selectedSla;
}

export function getCheapestDeliveryWindow(shippingOptions, date) {
	const selectedSla = shippingOptions.slas.find(sla => sla.id === shippingOptions.selectedSla.id);

	if (date) {
		const dateAsString = formatDateAsString(new Date(date));
		const deliveryWindows = selectedSla.deliveryWindows[dateAsString];
		let cheapestValue = Number.MAX_VALUE;
		let cheapestDw = null;

		deliveryWindows.forEach((dw) => {
			const value = dw.price + selectedSla.price;

			if (value < cheapestValue) {
				cheapestValue = value;
				cheapestDw = dw;
			}
		});

		return cheapestDw;
	}

	return selectedSla.cheapestDeliveryWindow;
}

export function updateLogisticsInfoModel(logisticsInfo, shippingOption, selectedSla, deliveryWindow) {
	return logisticsInfo.map((li) => {
		if (shippingOption.items.some(i => i.id === li.itemId)) {
			return Object.assign({}, li, {
				selectedSla,
				deliveryWindow
			});
		}

		return li;
	});
}

export function getShippingOptionsData(logisticsInfo, items, sellers) {
	const mappedLogisticsInfo = mapLogisticsInfo(logisticsInfo, items, sellers);
	const logisticsBySeller = _.groupBy(mappedLogisticsInfo, (so) => `seller${so.seller.id}`);
	const filledLogisticsInfo = fillLogisticsInfo(logisticsBySeller);
	const scheduledLogisticsInfo = fillScheduled(filledLogisticsInfo);
	const logisticsInfoArray = setCheapestSlaIfNull(scheduledLogisticsInfo);

	return logisticsInfoArray;
}
