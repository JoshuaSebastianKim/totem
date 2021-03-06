// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setEnvironment, setStore, setCompare, submitSettings } from '../redux/modules/settings';
import Settings from '../components/Settings/Settings';

function mapStateToProps(state) {
	return {
		availableEnvironments: state.settings.availableEnvironments,
		availableStores: state.settings.availableStores,
		environment: state.settings.environment,
		store: state.settings.store,
		compare: state.settings.compare
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setEnvironment, setStore, setCompare, submitSettings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
