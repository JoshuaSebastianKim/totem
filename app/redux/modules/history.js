const initialState = {
	currentLocation: '/',
	lastLocation: '',
	locationHistoryStack: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case '@@router/LOCATION_CHANGE': {
			const { locationHistoryStack } = state;

			locationHistoryStack.unshift(action.payload.pathname);

			if (locationHistoryStack.length > 5) {
				locationHistoryStack.pop();
			}

			return {
				...state,
				currentLocation: action.payload.pathname,
				lastLocation: state.currentLocation,
				locationHistoryStack
			};
		}
		default:
			return state;
	}
}
