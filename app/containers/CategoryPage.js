// @flow
import { connect } from 'react-redux';
import Category from '../components/Category/Category';
import { getCategoryTree } from '../redux/selectors/catalogSelectors';

function mapStateToProps(state, props) {
	return {
		categoryTree: getCategoryTree(state, props)
	};
}

export default connect(mapStateToProps)(Category);
