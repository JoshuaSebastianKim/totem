import getDefaultItem from './getDefaultItem';

export default function getProductPrice(product) {
	const defaultItem = getDefaultItem(product.items);

	if (defaultItem) {
		const defaultSeller = defaultItem.sellers.find(seller => seller.commertialOffer.AvailableQuantity > 0);

		return defaultSeller.commertialOffer.Price;
	}

	return 0;
}
