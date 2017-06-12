// @flow
import { connect } from 'react-redux';
import Departments from '../components/Departments/Departments';

function mapStateToProps(state) {
	return {
		categoryTree: state.catalog.categoryTree
	};
}

export default connect(mapStateToProps)(Departments);
