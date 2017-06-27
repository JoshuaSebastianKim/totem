// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import cart from './cart';
import catalog from './catalog';
import compare from './compare';
import history from './history';
import keyboard from './keyboard';
import modal from './modal';
import search from './search';

const rootReducer = combineReducers({
	router,
	cart,
	catalog,
	compare,
	history,
	keyboard,
	modal,
	search,
	loadingBar: loadingBarReducer
});

export default rootReducer;
