// @flow
import { connect } from 'react-redux';
import Categories from '../components/Categories/Categories';
import { getDepartmentTree } from '../redux/selectors/catalogSelectors';

function mapStateToProps(state, props) {
	return {
		departmentTree: state.catalog.categoryTree,
		categoryTree: getDepartmentTree(state, props)
	};
}

export default connect(mapStateToProps)(Categories);
