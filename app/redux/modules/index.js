// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as form } from 'redux-form';
import app from './app';
import cart from './cart';
import catalog from './catalog';
import checkout from './checkout';
import compare from './compare';
import history from './history';
import keyboard from './keyboard';
import modal from './modal';
import product from './product';
import printer from './printer';
import search from './search';

const rootReducer = combineReducers({
	form,
	router,
	app,
	cart,
	catalog,
	checkout,
	compare,
	history,
	keyboard,
	modal,
	product,
	printer,
	search,
	loadingBar: loadingBarReducer
});

export default rootReducer;
