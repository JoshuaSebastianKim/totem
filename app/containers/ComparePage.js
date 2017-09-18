// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Compare from '../components/Compare/Compare';
import { getCompareProducts } from '../redux/selectors/compareSelectors';
import { removeCompareItem } from '../redux/modules/compare';

function mapStateToProps(state) {
	return {
		products: getCompareProducts(state),
		lastLocation: state.history.lastLocation
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ onRemoveCompareItem: removeCompareItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
