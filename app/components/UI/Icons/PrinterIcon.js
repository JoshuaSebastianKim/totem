import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Printer from './svg/icn_print.svg';

const PrinterIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Printer} />
	</div>
);

PrinterIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

PrinterIcon.defaultProps = {
	style: {},
	className: ''
};

export default PrinterIcon;
