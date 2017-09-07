import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OrderPlaced from '../components/OrderPlaced/OrderPlaced';

function mapStateToProps(state, props) {
	return {
		orders: state.checkout.orders
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlaced);
