// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkout from '../components/Checkout/Checkout';

function mapStateToProps(state, props) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
