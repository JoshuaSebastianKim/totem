const ADD_COMPARE_ITEM = 'compare/ADD_COMPARE_ITEM';
const REMOVE_COMPARE_ITEM = 'compare/REMOVE_COMPARE_ITEM';
const TOGGLE_COMPARE_ITEM = 'compare/TOGGLE_COMPARE_ITEM';

const initialState = {
	items: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COMPARE_ITEM: {
			const items = state.items.indexOf(action.payload) === -1 ?
				state.items.concat([action.payload]) :
				state.items;

			return {
				...state,
				items
			};
		}
		case REMOVE_COMPARE_ITEM: {
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
		case TOGGLE_COMPARE_ITEM: {
			const items = state.items.slice();
			const indexOf = items.indexOf(action.payload);

			if (indexOf !== -1) {
				items.splice(indexOf, 1);
			} else {
				items.push(action.payload);
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

export function toggleCompareItem(productId) {
	console.log(productId);
	return {
		type: TOGGLE_COMPARE_ITEM,
		payload: productId
	};
}

export function addCompareItem(productId) {
	return {
		type: ADD_COMPARE_ITEM,
		payload: productId
	};
}

export function removeCompareItem(productId) {
	return {
		type: REMOVE_COMPARE_ITEM,
		payload: productId
	};
}
