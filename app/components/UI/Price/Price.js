import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

const Price = ({ price, currency }) => {
	return (
		<FormattedNumber
			value={price}
			style="currency"
			currency={currency}
		/>
	);
}

Price.propTypes = {
	price: PropTypes.number.isRequired,
	currency: PropTypes.string
};

Price.defaultProps = {
	currency: 'ARS'
}

export default Price;
