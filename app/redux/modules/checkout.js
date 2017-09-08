const ORDER_PLACED = 'checkout/ORDER_PLACED';

const initialState = {
	orders: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ORDER_PLACED:
			return {
				...state,
				orders: action.payload
			};
		default:
			return state;
	}
}

export function orderPlaced(orders) {
	return { type: ORDER_PLACED, payload: orders };
}
