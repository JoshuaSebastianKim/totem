// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import catalog from './catalog';

const rootReducer = combineReducers({ router, catalog });

export default rootReducer;
