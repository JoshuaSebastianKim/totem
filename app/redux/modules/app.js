import { destroy } from 'redux-form';

const START_IDLE_TIMER = 'app/START_IDLE_TIMER';
const RESET_IDLE_TIMER = 'app/RESET_IDLE_TIMER';
export const END_IDLE_TIMER = 'app/END_IDLE_TIMER';
const CLEAR_IDLE_TIMER = 'app/CLEAR_IDLE_TIMER';

const initialState = {
	isIdle: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case START_IDLE_TIMER:
		case RESET_IDLE_TIMER:
		case CLEAR_IDLE_TIMER:
			return {
				...state,
				isIdle: false
			};
		case END_IDLE_TIMER:
			return {
				...state,
				isIdle: true
			};
		default:
			return state;
	}
}


// IDLE TIMER
const idleTimeLimit = 10; // 10 minutes
const intervalTick = 60000; // 1 minute
let idleTimer = 0;
let idleInterval;

function startIdleTimer(dispatch) {
	function timerIncrement() {
		if (idleTimer >= idleTimeLimit) {
			dispatch(endIdleTimer());
			// Destroy form states
			dispatch(destroy('profile', 'shipping', 'payment'));
		} else {
			idleTimer += 1;
		}
	}

	idleInterval = setInterval(timerIncrement, intervalTick);

	return { type: START_IDLE_TIMER };
}

export function resetIdleTimer() {
	idleTimer = 0;

	return { type: RESET_IDLE_TIMER };
}

export function endIdleTimer() {
	clearInterval(idleInterval);

	return { type: END_IDLE_TIMER };
}

export function clearIdleTimer() {
	idleTimer = 0;
	idleInterval = clearInterval(idleInterval);

	return { type: CLEAR_IDLE_TIMER };
}

export function watchIdle() {
	return (dispatch, getState) => {
		const { app } = getState();

		if (!app.isIdle && !idleInterval) {
			dispatch(startIdleTimer(dispatch));
		}
	};
}
