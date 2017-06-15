import axios from 'axios';
import axiosRetry from 'axios-retry';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { SHA256 } from '../../utils';

axiosRetry(axios, { retries: 3 });

const { CancelToken } = axios;
let cancelToken;

const SEARCH_START = 'catalog/SEARCH_START';
export const SEARCH_FULFILLED = 'catalog/SEARCH_FULFILLED';
const SEARCH_REJECTED = 'catalog/SEARCH_REJECTED';
const SEARCH_CLEAR = 'catalog/SEARCH_CLEAR';
const CACHE_QUERY = 'catalog/CACHE_QUERY';

const initialState = {
	loading: false,
	searchResult: [],
	cache: {},
	error: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SEARCH_START:
			return {
				...state,
				loading: true
			};
		case SEARCH_FULFILLED:
			return {
				...state,
				loading: false,
				searchResult: action.payload
			};
		case SEARCH_REJECTED:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CACHE_QUERY:
			return {
				...state,
				cache: {
					...state.cache,
					...action.payload
				}
			};
		case SEARCH_CLEAR:
			return {
				...state,
				searchResult: [],
				error: ''
			};
		default:
			return state;
	}
}

async function search(query: string, cache) {
	const url = 'http://walmartar.vtexcommercestable.com.br/api/catalog_system/pub/products/search/';
	const hash = SHA256(query);

	if (cancelToken) {
		cancelToken();
	}

	// Cache layer
	if (hash in cache) {
		return Promise.resolve(cache[hash]);
	}

	return axios.get(`${url}?${query}`, {
		cancelToken: new CancelToken((token) => {
			cancelToken = token;
		})
	}).then(
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

function cacheQuery(queryString, response) {
	const hash = SHA256(queryString);

	return {
		type: CACHE_QUERY,
		payload: {
			[hash]: response
		}
	};
}

function queryToString(query) {
	const keys = Object.keys(query);
	const queryString = keys.map((key) => {
		const value = query[key];

		switch (key) {
			case 'text':
				return `ft=${value}`;
			case 'category':
				return `fq=C:${value}`;
			case 'range':
				return `_from=${value.from}&_to=${value.to}`;
			default:
				return '';
		}
	}).join('&');

	return queryString;
}

export function searchQuery(query, clear = true) {
	const queryString = queryToString(query);

	return (dispatch, getState) => {
		const { cache } = getState().search;

		dispatch(showLoading());
		dispatch(searchStart());

		return search(queryString, cache)
			.then((res) => {
				const products = clear ? res.data : getState().search.searchResult.concat(res.data);

				dispatch(hideLoading());
				dispatch(searchFulfilled(products));
				dispatch(cacheQuery(queryString, res));

				return res;
			}, (err) => {
				dispatch(searchRejected(err));

				return err;
			});
	};
}

export function clearSearch() {
	if (cancelToken) {
		cancelToken();
	}

	return {
		type: SEARCH_CLEAR
	};
}
