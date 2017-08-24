// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkout from '../components/Checkout/Checkout.02';
import { onFocusInput } from '../redux/modules/keyboard';

function mapStateToProps(state, props) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onFocusInput }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
