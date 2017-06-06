import axios from 'axios';

const SEARCH_START = 'catalog/SEARCH_START';
const SEARCH_FULFILLED = 'catalog/SEARCH_FULFILLED';
const SEARCH_REJECTED = 'catalog/SEARCH_REJECTED';
const SEARCH_CLEAR = 'catalog/SEARCH_CLEAR';

const initialState = {
	loading: false,
	searchResult: [],
	error: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SEARCH_START:
			return {
				loading: true
			};
		case SEARCH_FULFILLED:
			return {
				loading: false,
				searchResult: action.payload
			};
		case SEARCH_REJECTED:
			return {
				loading: false,
				error: action.payload
			};
		case SEARCH_CLEAR:
			return {
				searchResult: [],
				error: ''
			};
		default:
			return state;
	}
}

async function search(params) {
	const endpoint = 'http://walmartar.vtexcommercestable.com.br/api/catalog_system/pub/products/search/';

	return axios.get(`${endpoint}?${params}`)
		.then(
			res => res,
			err => err
		);
}

function searchStart() {
	return {
		type: SEARCH_START
	};
}

function searchFulfilled(response) {
	return {
		type: SEARCH_FULFILLED,
		payload: response
	};
}

function searchRejected(error) {
	return {
		type: SEARCH_REJECTED,
		payload: error
	};
}

export function searchTerm(term) {
	return (dispatch) => {
		dispatch(searchStart());

		return search(`ft=${term}`)
			.then(
				res => dispatch(searchFulfilled(res.data)),
				err => dispatch(searchRejected(err))
			);
	};
}

export function clearSearch() {
	return {
		type: SEARCH_CLEAR
	};
}
