import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SearchPage from './containers/SearchPage';

export default() => (
	<App>
		<Switch>
			<Route path="/search" component={SearchPage} />
			<Route path="/" component={HomePage} />
		</Switch>
	</App>
);
