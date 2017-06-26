import { createSelector } from 'reselect';

const getTree = state => state.catalog.categoryTree;
const getDepartmentId = (_, props) => parseInt(props.match.params.departmentId, 10);
const getCategoryId = (_, props) => parseInt(props.match.params.categoryId, 10);
const getProducts = state => state.catalog.products;
const getProductId = (_, props) => props.match.params.productId;

export const getDepartmentTree = createSelector(
	[getTree, getDepartmentId],
	(categoriesTree, departmentId) => categoriesTree.find(category => category.id === departmentId)
);

export const getCategoryTree = createSelector(
	[getTree, getDepartmentId, getCategoryId],
	(categoriesTree, departmentId, categoryId) => {
		const departmentTree = categoriesTree.find(category => category.id === departmentId);
		const categoryTree = departmentTree.children.find(category => category.id === categoryId);

		return categoryTree;
	}
);

export const getProduct = createSelector(
	[getProducts, getProductId],
	(products, productId) => {
		if (productId in products) {
			return Object.assign({}, products[productId]);
		}

		return null;
	}
);
