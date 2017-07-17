const INPUT_FOCUS = 'keyboard/INPUT_FOCUS';
const INPUT_BLUR = 'keyboard/INPUT_BLUR';
const TOGGLE_OPEN = 'keyboard/TOGGLE_OPEN';

const initialState = {
	input: document.createElement('input'),
	open: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case INPUT_FOCUS:
			return {
				...state,
				input: action.payload,
				open: true
			};
		case INPUT_BLUR:
			return {
				...state,
				input: null
			};
		case TOGGLE_OPEN: {
			return {
				...state,
				open: !state.open
			};
		}
		default:
			return state;
	}
}

export function onFocusInput(inputDOM) {
	return {
		type: INPUT_FOCUS,
		payload: inputDOM
	};
}

export function onBlurInput() {
	return {
		type: INPUT_BLUR
	};
}

export function toggleKeyboard() {
	return {
		type: TOGGLE_OPEN
	};
}

export function listenCheckoutFrameMessages(dispatch) {
	function receiveMessage(event) {
		if (event.data) {
			// In the event data we receive the input ID and we get it in the element
			const inputDOM = event.source.document.getElementById(event.data);

			// If the element really exist (should be redundant as the input is
			// indeed the element firing the event)
			if (inputDOM) {
				dispatch(onFocusInput(inputDOM));
			}
		}
	}

	window.addEventListener('message', receiveMessage, false);
}
