import { ADD_TO_CART } from './cart';
import {
	PRINT_TICKET_START,
	PRINT_TICKET_SUCCESS,
	PRINT_TICKET_ERROR
} from './printer';

const SET_STORE_NAME = 'modal/SET_STORE_NAME';
const TOGGLE_STORE_MODAL = 'modal/TOGGLE_STORE_MODAL';
const TOGGLE_ADDED_TO_CART_MODAL = 'modal/TOGGLE_ADDED_TO_CART_MODAL';
const CLOSE_ADDED_TO_CART_MODAL = 'modal/CLOSE_ADDED_TO_CART_MODAL';
const TOGGLE_CART_MODAL = 'modal/TOGGLE_CART_MODAL';
const CLOSE_CART_MODAL = 'modal/CLOSE_CART_MODAL';
const TOGGLE_PRINT_TICKET_MODAL = 'modal/TOGGLE_PRINT_TICKET_MODAL';

const initialState = {
	storeModalOpen: false,
	addedToCartOpen: false,
	cartModalOpen: false,
	ticketPrintModalOpen: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_STORE_NAME:
			return {
				...state,
				storeName: action.payload
			};
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
		case TOGGLE_PRINT_TICKET_MODAL:
		case PRINT_TICKET_START:
			return {
				...state,
				ticketPrintModalOpen: !state.ticketPrintModalOpen
			};
		case PRINT_TICKET_SUCCESS:
		case PRINT_TICKET_ERROR:
			return {
				...state,
				ticketPrintModalOpen: false
			};
		default:
			return state;
	}
}

// Store modal actions
export function toggleStoreModal() {
	return {
		type: TOGGLE_STORE_MODAL
	};
}

// Added to cart modal actions
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

// Cart modal actions
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

// Print ticket modal actions
export function togglePrintTicketModal() {
	return {
		type: TOGGLE_PRINT_TICKET_MODAL
	};
}
