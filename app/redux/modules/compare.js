const compareItemsLengthLimit = 4;

const ADD_COMPARE_ITEM = 'compare/ADD_COMPARE_ITEM';
const REMOVE_COMPARE_ITEM = 'compare/REMOVE_COMPARE_ITEM';
const TOGGLE_COMPARE_ITEM = 'compare/TOGGLE_COMPARE_ITEM';

const initialState = {
	reachedLimit: false,
	items: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COMPARE_ITEM: {
			const items = state.items.indexOf(action.payload) === -1 ?
				state.items.concat([action.payload]) :
				state.items;
			let reachedLimit = false;

			if (items.length === compareItemsLengthLimit) {
				reachedLimit = true;
			}

			return {
				...state,
				items,
				reachedLimit
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
				items,
				reachedLimit: false
			};
		}
		case TOGGLE_COMPARE_ITEM: {
			let { reachedLimit } = state;
			const items = state.items.slice();
			const indexOf = items.indexOf(action.payload);

			if (indexOf !== -1) {
				items.splice(indexOf, 1);
			} else if (!reachedLimit) {
				items.push(action.payload);
			}

			if (items.length === compareItemsLengthLimit) {
				reachedLimit = true;
			} else {
				reachedLimit = false;
			}

			return {
				...state,
				items,
				reachedLimit
			};
		}
		default:
			return state;
	}
}

export function toggleCompareItem(productId) {
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
