// @flow
import React from 'react';
import { FormattedNumber } from 'react-intl';

type Props = {
	price: number,
	currency: string
};

const Price = ({ price, currency }: Props) => (
	<FormattedNumber
		value={price}
		style="currency"
		currency={currency}
	/>
);

Price.defaultProps = {
	currency: 'ARS'
};

export default Price;
