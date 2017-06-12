// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Product from '../components/Product/Product';

function mapStateToProps(state) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
