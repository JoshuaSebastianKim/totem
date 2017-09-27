import fs from 'fs';
import moment from 'moment';
import { printer } from '../../utils';

const PRINTER_INITIALIZED = 'printer/PRINTER_INITIALIZED';
const PRINTER_ERROR = 'printer/PRINTER_ERROR';
export const PRINT_TICKET_START = 'printer/PRINT_TICKET_START';
export const PRINT_TICKET_SUCCESS = 'printer/PRINT_TICKET_SUCCESS';
export const PRINT_TICKET_ERROR = 'printer/PRINT_TICKET_ERROR';

const initialState = {
	initialized: false,
	config: {},
	printing: false,
	error: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case PRINTER_INITIALIZED:
			return {
				...state,
				initialized: true,
				config: action.payload
			};
		case PRINTER_ERROR:
			return {
				...state,
				error: action.payload
			};
		case PRINT_TICKET_START:
			return {
				...state,
				printing: true
			};
		case PRINT_TICKET_SUCCESS:
			return {
				...state,
				printing: false
			};
		case PRINT_TICKET_ERROR:
			return {
				...state,
				printing: false,
				error: action.payload
			};
		default:
			return state;
	}
}

function getPrinterPath() {
	switch (process.platform) {
		case 'win32':
			return '\\\\totem\\EPSON';
		default: {
			const usbPath = '/dev/usb/';
			const files = fs.readdirSync(usbPath);

			return `${usbPath}${files[0]}`;
		}
	}
}

export function printerInit() {
	try {
		const printerPath = getPrinterPath();
		const config = {
			type: 'epson',
			characterSet: 'LATINA',
			interface: printerPath
		};

		printer.init(config);

		return {
			type: PRINTER_INITIALIZED,
			payload: config
		};
	} catch (err) {
		return {
			type: PRINTER_ERROR,
			payload: err
		};
	}
}

function printTicketStart() {
	return {
		type: PRINT_TICKET_START
	};
}

function printTicketSucces() {
	return {
		type: PRINT_TICKET_SUCCESS
	};
}

function printTicketError(err) {
	return {
		type: PRINT_TICKET_ERROR,
		payload: err
	};
}

function printExampleTicket(resolveTimeout = 5000) {
	return new Promise((resolve, reject) => {
		printer.alignCenter();
		printer.println('TICKET EJEMPLO WALMART');
		printer.alignLeft();
		printer.newLine();
		printer.println('Hello World!');
		printer.drawLine();

		printer.upsideDown(true);
		printer.println('Hello World upside down!');
		printer.upsideDown(false);
		printer.drawLine();

		printer.invert(true);
		printer.println('Hello World inverted!');
		printer.invert(false);
		printer.drawLine();

		printer.println('Special characters: ČčŠšŽžĐđĆćßẞöÖÄäüÜé');
		printer.drawLine();

		printer.setTypeFontB();
		printer.println('Type font B');
		printer.setTypeFontA();
		printer.println('Type font A');
		printer.drawLine();

		printer.alignLeft();
		printer.println('This text is on the left');
		printer.alignCenter();
		printer.println('This text is in the middle');
		printer.alignRight();
		printer.println('This text is on the right');
		printer.alignLeft();
		printer.drawLine();

		printer.setTextDoubleHeight();
		printer.println('This is double height');
		printer.setTextDoubleWidth();
		printer.println('This is double width');
		printer.setTextQuadArea();
		printer.println('This is quad');
		printer.setTextNormal();
		printer.println('This is normal');
		printer.drawLine();

		printer.printBarcode('0123456789123', 67, { width: 6, height: 168 });

		printer.drawLine();

		printer.printQR('QR Code', {
			cellSize: 8,
			correction: 'H',
			model: 2
		});

		printer.drawLine();

		printer.leftRight('Left', 'Right');

		printer.table(['One', 'Two', 'Three', 'Four']);

		printer.tableCustom([
			{ text: 'Left', align: 'LEFT', width: 0.5 },
			{ text: 'Center', align: 'CENTER', width: 0.25, bold: true },
			{ text: 'Right', align: 'RIGHT', width: 0.25 }
		]);

		printer.cut();
		printer.execute((err) => {
			if (err) {
				return reject(err);
			}

			setTimeout(() => resolve(true), resolveTimeout);
		});
	});
}

function printRealTicket(product, order, resolveTimeout = 5000) {
	return new Promise((resolve, reject) => {
		printer.alignCenter();

		printer.setTextDoubleHeight();
		printer.println('NO VALIDO COMO TICKET FISCAL');

		printer.drawLine();

		printer.setTextQuadArea();
		printer.println('GRACIAS POR TU COMPRA');

		printer.setTextDoubleHeight();
		printer.drawLine();
		printer.newLine();

		printer.setTextNormal();

		printer.println('ARTICULO');
		printer.println(product.productName.substring(0, 200));
		printer.newLine();

		printer.println('CODIGO');
		printer.println(product.items[0].ean);
		printer.newLine();

		printer.println('PRODUCTO A ABONAR EN CAJA');
		printer.newLine();

		printer.println('ABONADO EL MISMO RETIRA EL');
		printer.println('PRODUCTO POR ATENCION AL CLIENTE');
		printer.println('PRESENTANDO EL TICKET DE CAJA');
		printer.newLine();

		printer.printBarcode(product.items[0].ean, 67, { width: 6, height: 168 });

		printer.cut();
		printer.execute((err) => {
			if (err) {
				return reject(err);
			}

			setTimeout(() => resolve(true), resolveTimeout);
		});
	});
}

function printOrder(order, resolveTimeout = 5000) {
	const { selectedSla, slas } = order.shippingData.logisticsInfo[0];
	const { deliveryWindow } = slas.find(sla => sla.id === selectedSla);
	const dateFormatted = moment(deliveryWindow.startDateUtc).format('DD/MM/YYYY');

	return new Promise((resolve, reject) => {
		printer.alignCenter();

		printer.setTextDoubleHeight();
		printer.println('NO VALIDO COMO TICKET FISCAL');

		printer.drawLine();

		printer.setTextQuadArea();
		printer.println('GRACIAS POR TU COMPRA');

		printer.setTextDoubleHeight();
		printer.drawLine();

		printer.println(`CODIGO DE ORDEN: ${order.orderId}`);
		printer.drawLine();
		printer.newLine();

		printer.setTextNormal();

		order.items.forEach((item) => {
			printer.println('ARTICULO');
			printer.println(item.name.substring(0, 200));
			printer.newLine();

			printer.println('CODIGO');
			printer.println(item.ean);
			printer.newLine();

			printer.printBarcode(item.ean, 67, { width: 6, height: 168 });
			printer.newLine();
		});

		printer.println('PRODUCTO A ABONAR EN CAJA');
		printer.newLine();

		if (/retiro en tienda/ig.test(selectedSla)) {
			printer.println('PRODUCTO A RETIRAR EN ESTA');
			printer.println('SUCURSAL A PARTIR DEL');
			printer.println(dateFormatted);
			printer.newLine();
		}

		if (/envio a domicilio/ig.test(selectedSla)) {
			printer.println('ENVIO A DOMICILIO ACORDADO');
			printer.println('PARA EL DIA');
			printer.println(dateFormatted);
			printer.newLine();
		}

		printer.cut();
		printer.execute((err) => {
			if (err) {
				return reject(err);
			}

			setTimeout(() => resolve(true), resolveTimeout);
		});
	});
}

export function printTicket(product) {
	return dispatch => {
		dispatch(printTicketStart());

		return printRealTicket(product).then(
			() => dispatch(printTicketSucces()),
			(err) => dispatch(printTicketError(err))
		);
	};
}

export function printOrderTicket(order) {
	return dispatch => {
		dispatch(printTicketStart());

		return printOrder(order).then(
			() => dispatch(printTicketSucces()),
			(err) => dispatch(printTicketError(err))
		);
	};
}
