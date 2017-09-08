import axios from 'axios';
import axiosRetry from 'axios-retry';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { SHA256 } from '../../utils';

axiosRetry(axios, { retries: 3 });

const { CancelToken } = axios;
let cancelToken;

const SEARCH_START = 'search/SEARCH_START';
export const SEARCH_FULFILLED = 'search/SEARCH_FULFILLED';
const SEARCH_REJECTED = 'search/SEARCH_REJECTED';
const SEARCH_CLEAR = 'search/SEARCH_CLEAR';
const CACHE_QUERY = 'search/CACHE_QUERY';
const STORE_LAST_CURRENT_PAGE_STATE = 'search/STORE_LAST_CURRENT_PAGE_STATE';

const initialState = {
	loading: false,
	searchResult: [],
	cache: {},
	lastCurrentPageState: {
		props: {
			query: {},
			config: {}
		},
		state: {}
	},
	error: null,
	success: false
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
				searchResult: action.payload,
				success: true
			};
		case SEARCH_REJECTED:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false
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
				error: '',
				success: false
			};
		case STORE_LAST_CURRENT_PAGE_STATE:
			return {
				...state,
				lastCurrentPageState: action.payload
			};
		default:
			return state;
	}
}

async function search(query: string, cache) {
	const url = 'http://totemwalmartarqa.vtexcommercestable.com.br/api/catalog_system/pub/products/search/';
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

export function searchFulfilled(products) {
	return {
		type: SEARCH_FULFILLED,
		payload: products
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

export function storeLastCurrentPageState(lastCurrentPageState) {
	return {
		type: STORE_LAST_CURRENT_PAGE_STATE,
		payload: lastCurrentPageState
	};
}
