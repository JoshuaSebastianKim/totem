const initialState = {
	currentLocation: '',
	lastLocation: ''
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case '@@router/LOCATION_CHANGE':
			return {
				...state,
				currentLocation: action.payload.pathname,
				lastLocation: state.currentLocation
			};
		default:
			return state;
	}
}
