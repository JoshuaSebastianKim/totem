export default function calculateDiscountPercent(listPrice, bestPrice) {
	return Math.round(((listPrice - bestPrice) * 100) / listPrice);
}
