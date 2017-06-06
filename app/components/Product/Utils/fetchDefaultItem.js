export default function fetchDefaultItem(items) {
	return items.find(item => (
		item.sellers.some(seller => (
			seller.commertialOffer.AvailableQuantity > 0
		))
	));
}
