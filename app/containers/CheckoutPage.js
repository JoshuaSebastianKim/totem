// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Category from '../components/Category/Category';

function mapStateToProps(state, props) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
