import { createSelector } from 'reselect';

const getCartItemsIds = state => state.cart.items;
const getProducts = state => state.catalog.products;

export const getCartItems = createSelector(
	[getCartItemsIds, getProducts],
	(cartItemsIds, products) => cartItemsIds.reduce((cartItems, itemId) => {
		if (itemId in products) {
			return cartItems.concat([products[itemId]]);
		}

		return cartItems;
	}, [])
);
