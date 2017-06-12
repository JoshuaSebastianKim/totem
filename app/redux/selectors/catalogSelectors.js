import { createSelector } from 'reselect';

const getCategoryTree = state => state.catalog.categoryTree;
const getDepartmentId = (_, props) => parseInt(props.match.params.departmentId, 10);

export const getDepartmentTree = createSelector(
	[getCategoryTree, getDepartmentId],
	(categoryTree, departmentId) => categoryTree.find(category => category.id === departmentId)
);
