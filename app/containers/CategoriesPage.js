// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Categories from '../components/Categories/Categories';
import { removeCompareItem } from '../redux/modules/compare';
import { getCompareItems } from '../redux/selectors/compareSelectors';
import { getDepartmentTree } from '../redux/selectors/catalogSelectors';

function mapStateToProps(state, props) {
	return {
		departmentTree: state.catalog.categoryTree,
		categoryTree: getDepartmentTree(state, props),
		compareItems: getCompareItems(state)
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ removeCompareItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
