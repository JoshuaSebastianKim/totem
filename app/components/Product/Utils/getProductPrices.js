import getDefaultItem from './getDefaultItem';

export default function getProductPrices(product) {
	const defaultItem = getDefaultItem(product.items);
	let prices = [];

	if (defaultItem) {
		const defaultSeller = defaultItem.sellers.find(seller => seller.commertialOffer.AvailableQuantity > 0);
		const { ListPrice, Price } = defaultSeller.commertialOffer;

		if (ListPrice !== Price) {
			prices = prices.concat([{
				type: 'list-price',
				value: ListPrice
			}]);
		}

		prices = prices.concat([{
			type: 'price',
			value: Price
		}]);
	}

	return prices;
}
