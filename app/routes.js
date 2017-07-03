import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import CategoriesPage from './containers/CategoriesPage';
import CategoryPage from './containers/CategoryPage';
import CheckoutPage from './containers/CheckoutPage';
import ComparePage from './containers/ComparePage';
import DepartmentsPage from './containers/DepartmentsPage';
import HomePage from './containers/HomePage';
import ProductPage from './containers/ProductPage';
import SearchPage from './containers/SearchPage';
import { MainSidebar, CategorySidebar } from './components/UI/Sidebar';
import Keyboard from './containers/KeyboardContainer';

export default() => (
	<App>
		{/* SIDEBAR */}
		<div id="sidebar">
			{/* MAIN SIDEBAR */}
			<Switch>
				<Route path="/cart" component={MainSidebar} />
				<Route path="/category" component={MainSidebar} />
				<Route path="/checkout" component={MainSidebar} />
				<Route path="/compare" component={MainSidebar} />
				<Route path="/departments" component={MainSidebar} />
				<Route path="/search" component={MainSidebar} />
				<Route path="/product" component={MainSidebar} />
			</Switch>

			{/* DEPARTMENTS SIDEBAR */}
			<Switch>
				<Route path="/product" component={CategorySidebar} />
				<Route path="/category/:departmentId" component={CategorySidebar} />
			</Switch>
		</div>

		{/* CONTENT */}
		<div id="content">
			<Switch>
				<Route path="/category/:departmentId/:categoryId" component={CategoryPage} />
				<Route path="/category/:departmentId" component={CategoriesPage} />
				<Route path="/category" component={DepartmentsPage} />
				<Route path="/compare" component={ComparePage} />
				<Route path="/checkout" component={CheckoutPage} />
				<Route path="/product/:productId" component={ProductPage} />
				<Route path="/search" component={SearchPage} />
				<Route path="/" component={HomePage} />
			</Switch>

			{/* KEYBOARD */}
			<Switch>
				<Route path="/search" component={Keyboard} />
			</Switch>
		</div>
	</App>
);
