import { createSelector } from 'reselect';

const getCompareItemsIds = state => state.compare.items;
const getProductId = (_, props) => console.log(props);

export const isComparing = createSelector(
	[getCompareItemsIds, getProductId],
	(compareItemsIds, productId) => compareItemsIds.indexOf(productId) !== -1
);
