import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OrderPlaced from '../components/OrderPlaced/OrderPlaced';
import { clearCart } from '../redux/modules/cart';

function mapStateToProps(state, props) {
	return {
		orders: state.checkout.orders
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onClearCart: clearCart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlaced);
