import { END_IDLE_TIMER } from './app';

export const ADD_TO_CART = 'cart/ADD_TO_CART';
export const CHECKOUT_ITEM = 'cart/CHECKOUT_ITEM';
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const CLEAR_CART = 'cart/CLEAR_CART';

const initialState = {
	items: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
		case CHECKOUT_ITEM: {
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
		case CLEAR_CART:
		case END_IDLE_TIMER:
			return {
				...state,
				items: []
			};
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

export function checkoutItem(productId) {
	return {
		type: CHECKOUT_ITEM,
		payload: productId
	};
}

export function removeFromCart(productId) {
	return {
		type: REMOVE_FROM_CART,
		payload: productId
	};
}

export function clearCart() {
	return {
		type: CLEAR_CART
	};
}
