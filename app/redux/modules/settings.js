const environments = [
	'walmartar',
	'totemwalmartarqa'
];
const stores = {
	'25': {
		name: 'Walmart Pilar',
		saleChannel: '25',
		postalCode: 1615
	}
};

const SET_ENVIRONMENT = 'settings/SET_ENVIRONMENT';
const SET_STORE = 'settings/SET_STORE';
const SET_COMPARE = 'settings/SET_COMPARE';
const SUBMIT_SETTINGS = 'setting/SUBMIT_SETTINGS';

const initialState = {
	hasSettings: false,
	availableEnvironments: environments,
	availableStores: stores,
	environment: 'totemwalmartarqa',
	store: '25',
	storeData: stores['25'],
	compare: true
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_ENVIRONMENT:
			return {
				...state,
				environment: action.payload
			};
		case SET_STORE:
			return {
				...state,
				store: action.payload,
				storeData: stores[action.payload]
			};
		case SUBMIT_SETTINGS:
			return {
				...state,
				hasSettings: true
			};
		case SET_COMPARE:
			return {
				...state,
				compare: action.payload
			};
		default:
			return state;
	}
}

export function setEnvironment(environment) {
	return {
		type: SET_ENVIRONMENT,
		payload: environment
	};
}

export function setStore(storeId) {
	return {
		type: SET_STORE,
		payload: storeId
	};
}

export function setCompare(isActive) {
	return {
		type: SET_COMPARE,
		payload: isActive
	};
}

export function submitSettings() {
	return {
		type: SUBMIT_SETTINGS
	};
}
