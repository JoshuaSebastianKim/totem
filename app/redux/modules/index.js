// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import catalog from './catalog';
import keyboard from './keyboard';

const rootReducer = combineReducers({ router, catalog, keyboard });

export default rootReducer;
