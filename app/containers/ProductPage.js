// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Product from '../components/Product/Product';
import { getProduct } from '../redux/selectors/catalogSelectors';

function mapStateToProps(state, props) {
	return {
		product: getProduct(state, props)
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
