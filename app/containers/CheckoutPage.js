// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Checkout from '../components/Checkout/Checkout.02';
import { onFocusInput } from '../redux/modules/keyboard';
import { orderPlaced } from '../redux/modules/checkout';

function mapStateToProps(state, props) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onFocusInput,
		submitForm: submit,
		orderPlaced
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
