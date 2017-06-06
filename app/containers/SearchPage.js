// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search/Search';
import { onFocusInput } from '../redux/modules/keyboard';

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onFocusInput }, dispatch);
}

export default connect(null, mapDispatchToProps)(Search);
