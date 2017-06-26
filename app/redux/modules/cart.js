export const ADD_TO_CART = 'cart/ADD_TO_CART';
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';

const initialState = {
	items: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART: {
			const items = state.items.indexOf(action.payload) === -1 ?
				state.items.concat([action.payload]) :
				state.items;

			return {
				...state,
				items
			};
		}
		case REMOVE_FROM_CART: {
			const items = state.items.slice();
			const indexOf = items.indexOf(action.payload);

			if (indexOf !== -1) {
				items.splice(indexOf, 1);
			}

			return {
				...state,
				items
			};
		}
		default:
			return state;
	}
}

export function addToCart(productId) {
	return {
		type: ADD_TO_CART,
		payload: productId
	};
}

export function removeFromCart(productId) {
	return {
		type: REMOVE_FROM_CART,
		payload: productId
	};
}
