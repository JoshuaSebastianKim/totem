import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Keyboard from '../components/Keyboard/Keyboard';
import { toggleKeyboard, listenCheckoutFrameMessages } from '../redux/modules/keyboard';

function mapStateToProps(state) {
	return {
		input: state.keyboard.input,
		open: state.keyboard.open
	};
}

function mapDispatchToProps(dispatch) {
	listenCheckoutFrameMessages(dispatch);

	return bindActionCreators({ toggleKeyboard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);
