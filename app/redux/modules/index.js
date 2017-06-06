// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import catalog from './catalog';
import keyboard from './keyboard';
import search from './search';

const rootReducer = combineReducers({ router, catalog, keyboard, search });

export default rootReducer;
