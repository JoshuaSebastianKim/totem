import fs from 'fs';
import { printer } from '../../utils';

const PRINTER_INITIALIZED = 'printer/PRINTER_INITIALIZED';
const PRINTER_ERROR = 'printer/PRINTER_ERROR';
export const PRINT_TICKET_START = 'printer/PRINT_TICKET_START';
export const PRINT_TICKET_SUCCESS = 'printer/PRINT_TICKET_SUCCESS';
export const PRINT_TICKET_ERROR = 'printer/PRINT_TICKET_ERROR';

console.log(process.platform);

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

function printRealTicket(product, resolveTimeout = 5000) {
	return new Promise((resolve, reject) => {
		console.log(product);
		printer.alignCenter();

		printer.setTextDoubleHeight();
		printer.println('NO VALIDO COMO TIQUE');
		printer.setTextNormal();

		printer.drawLine();

		printer.setTextQuadArea();
		printer.println('CUPON PERSONALIZADO');
		printer.setTextNormal();

		// Set date
		const date = new Date();
		const dateFormatted = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;

		printer.println(`VALIDO HASTA EL ${dateFormatted}`);

		printer.drawLine();
		printer.newLine();

		printer.bold(true);
		printer.println('SU PRODUCTO SERA ENTREGADO DENTRO DE');
		printer.println('LOS 15 DIAS');
		printer.bold(false);
		printer.setTextNormal();

		printer.newLine();

		// Product info in table
		// printer.table(['CODIGO', 'ARTICULO']);
		// printer.table([$scope.product.ean, ($scope.product.productName).substr(0,21)]);
		// printer.newLine();

		// Product info in lines
		printer.println('CODIGO');
		printer.println(product.items[0].ean)
		printer.newLine();

		printer.println('ARTICULO');
		printer.println(product.productName.substring(0, 200))
		printer.newLine();

		printer.println('NO VALIDO COMO TIQUE');

		printer.newLine();

		printer.printBarcode(product.items[0].ean, 67, { width: 6, height: 168 });
		printer.newLine();

		printer.setTextDoubleHeight();
		printer.println('GRACIAS');
		printer.println('POR ELEGIRNOS');

		printer.newLine();

		printer.println('NO VALIDO COMO TIQUE');
		printer.setTextNormal();

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

		// TODO: Replace example ticket with the real one
		return printRealTicket(product).then(
			() => dispatch(printTicketSucces()),
			(err) => dispatch(printTicketError(err))
		);
	};
}
