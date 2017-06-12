import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SearchPage from './containers/SearchPage';
import CartPage from './containers/CartPage';
import CategoriesPage from './containers/CategoriesPage';
import CategoryPage from './containers/CategoryPage';
import DepartmentsPage from './containers/DepartmentsPage';
import ProductPage from './containers/ProductPage';
import { MainSidebar } from './components/UI/Sidebar';
import Keyboard from './containers/KeyboardContainer';

export default() => (
	<App>
		{/* SIDEBAR */}
		<div id="sidebar">
			<Switch>
				<Route path="/cart" component={MainSidebar} />
				<Route path="/category" component={MainSidebar} />
				<Route path="/department" component={MainSidebar} />
				<Route path="/departments" component={MainSidebar} />
				<Route path="/search" component={MainSidebar} />
				<Route path="/product" component={MainSidebar} />
			</Switch>
		</div>

		{/* CONTENT */}
		<div id="content">
			<Switch>
				<Route path="/cart" component={CartPage} />
				<Route path="/category/:departmentId" component={CategoriesPage} />
				<Route path="/category/:departmentId/:categoryId" component={CategoryPage} />
				<Route path="/departments" component={DepartmentsPage} />
				<Route path="/search" component={SearchPage} />
				<Route path="/product/:id" component={ProductPage} />
				<Route path="/" component={HomePage} />
			</Switch>

			<Keyboard />
		</div>
	</App>
);
