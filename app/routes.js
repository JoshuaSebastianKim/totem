import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SearchPage from './containers/SearchPage';
import CartPage from './containers/CartPage';
import CategoriesPage from './containers/CategoriesPage';
import { MainSidebar } from './components/UI/Sidebar';

export default() => (
	<App>
		{/* SIDEBAR */}
		<Route path="/cart" component={MainSidebar} />
		<Route path="/category" component={MainSidebar} />
		<Route path="/search" component={MainSidebar} />

		{/* CONTENT */}
		<Switch>
			<Route path="/cart" component={CartPage} />
			<Route path="/category" component={CategoriesPage} />
			<Route path="/search" component={SearchPage} />
			<Route path="/" component={HomePage} />
		</Switch>
	</App>
);
