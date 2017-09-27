import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OrderPlaced from '../components/OrderPlaced/OrderPlaced';
import { clearCart } from '../redux/modules/cart';
import { printOrderTicket } from '../redux/modules/printer';

function mapStateToProps(state, props) {
	return {
		orders: state.checkout.orders
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onClearCart: clearCart, onPrintOrderTicket: printOrderTicket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlaced);
