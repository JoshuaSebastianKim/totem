// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search/Search';
import { clearSearch, storeLastCurrentPageState } from '../redux/modules/search';
import { onFocusInput } from '../redux/modules/keyboard';

function mapStateToProps(state) {
	return {
		searchSuccess: state.search.success,
		isKeyboardOpen: state.keyboard.open,
		lastLocation: state.history.lastLocation,
		lastCurrentPageState: state.search.lastCurrentPageState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onFocusInput, clearSearch, storeLastCurrentPageState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
