import storage from 'store';

const TOGGLE_STORE_MODAL = 'modal/TOGGLE_STORE_MODAL';
const SET_STORE_NAME = 'modal/SET_STORE_NAME';

const initialState = {
	storeName: storage.get('storeName'),
	storeModalOpen: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_STORE_MODAL:
			return {
				...state,
				storeModalOpen: !state.storeModalOpen
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

export function setStoreName(name) {
	storage.set('storeName', name);

	return {
		type: SET_STORE_NAME,
		payload: name
	};
}
