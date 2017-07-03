import { createSelector } from 'reselect';

const getCompareItemsIds = state => state.compare.items;
const getProducts = state => state.catalog.products;
const getProductId = (_, props) => props.product.productId;

export const isCompareActive = createSelector(
	[getCompareItemsIds, getProductId],
	(compareItemsIds, productId) => compareItemsIds.indexOf(productId) !== -1
);

export const getCompareItems = createSelector(
	[getCompareItemsIds, getProducts],
	(compareItemsIds, products) => compareItemsIds.map(itemId => ({
		id: itemId,
		image: products[itemId].items[0].images[0].imageUrl
	}))
);

export const getCompareProducts = createSelector(
	[getCompareItemsIds, getProducts],
	(compareItemsIds, products) => compareItemsIds.map(itemId => products[itemId])
);
