// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Category from '../components/Category/Category';
import { getCategoryTree } from '../redux/selectors/catalogSelectors';
import { getCompareItems } from '../redux/selectors/compareSelectors';
import { removeCompareItem } from '../redux/modules/compare';

function mapStateToProps(state, props) {
	return {
		categoryTree: getCategoryTree(state, props),
		compareItems: getCompareItems(state)
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ removeCompareItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
