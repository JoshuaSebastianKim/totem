// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar'
import catalog from './catalog';
import keyboard from './keyboard';
import search from './search';

const rootReducer = combineReducers({
	router,
	catalog,
	keyboard,
	search,
	loadingBar: loadingBarReducer
});

export default rootReducer;