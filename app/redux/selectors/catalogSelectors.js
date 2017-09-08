import { createSelector } from 'reselect';

const getTree = state => state.catalog.categoryTree;
const getDepartmentId = (_, props) => props.match.params.departmentId;
const getCategoryId = (_, props) => {
	const ids = props.match.params.categoryId.split('-');

	return ids[ids.length - 1];
};
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
		const categoryTree = departmentTree.children.find(category => new RegExp(categoryId).test(category.id));

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
