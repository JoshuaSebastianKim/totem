// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search/Search';
import { searchTerm, clearSearch } from '../redux/modules/search';
import { onFocusInput } from '../redux/modules/keyboard';

function mapStateToProps(state) {
	return {
		searchResult: state.search.searchResult
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onFocusInput, searchTerm, clearSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
