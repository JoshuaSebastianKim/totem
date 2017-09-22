import React from 'react';
import PropTypes from 'prop-types';
import { PrinterIcon } from '../../UI/Icons';
import { Button } from '../../UI/Buttons';

const ProductPrintTicketButton = ({ className, style, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<PrinterIcon />

		<span>
			PAGAR AHORA EN CAJA
		</span>
	</Button>
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
