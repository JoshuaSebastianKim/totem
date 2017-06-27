import storage from 'store';
import { ADD_TO_CART } from './cart';

const TOGGLE_STORE_MODAL = 'modal/TOGGLE_STORE_MODAL';
const TOGGLE_ADDED_TO_CART_MODAL = 'modal/TOGGLE_ADDED_TO_CART_MODAL';
const CLOSE_ADDED_TO_CART_MODAL = 'modal/CLOSE_ADDED_TO_CART_MODAL';
const TOGGLE_CART_MODAL = 'modal/TOGGLE_CART_MODAL';
const CLOSE_CART_MODAL = 'modal/CLOSE_CART_MODAL';
const SET_STORE_NAME = 'modal/SET_STORE_NAME';

const initialState = {
	storeName: storage.get('storeName'),
	storeModalOpen: false,
	addedToCartOpen: false,
	cartModalOpen: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_STORE_MODAL:
			return {
				...state,
				storeModalOpen: !state.storeModalOpen
			};
		case TOGGLE_ADDED_TO_CART_MODAL:
		case ADD_TO_CART:
			return {
				...state,
				addedToCartOpen: !state.addedToCartOpen
			};
		case CLOSE_ADDED_TO_CART_MODAL:
			return {
				...state,
				addedToCartOpen: false
			};
		case TOGGLE_CART_MODAL:
			return {
				...state,
				cartModalOpen: !state.cartModalOpen
			};
		case CLOSE_CART_MODAL:
		case '@@router/LOCATION_CHANGE':
			return {
				...state,
				cartModalOpen: false
			};
		case SET_STORE_NAME:
			return {
				...state,
				storeName: action.payload
			};
		default:
			return state;
	}
}

export function toggleStoreModal() {
	return {
		type: TOGGLE_STORE_MODAL
	};
}

export function toggleAddedToCartModal() {
	return {
		type: TOGGLE_ADDED_TO_CART_MODAL
	};
}

export function closeAddedToCartModal() {
	return {
		type: CLOSE_ADDED_TO_CART_MODAL
	};
}

export function toggleCartModal() {
	return {
		type: TOGGLE_CART_MODAL
	};
}

export function closeCartModal() {
	return {
		type: CLOSE_CART_MODAL
	};
}
