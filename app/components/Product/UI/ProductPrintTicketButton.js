import React from 'react';
import PropTypes from 'prop-types';
import { PrinterIcon } from '../../UI/Icons';

const ProductPrintTicketButton = ({ className, style, onClick }) => (
	<button className={className} style={style} onClick={onClick}>
		<PrinterIcon />

		<span>
			IMPRIMIR TICKET
		</span>
	</button>
);

ProductPrintTicketButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

ProductPrintTicketButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default ProductPrintTicketButton;
