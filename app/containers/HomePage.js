// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home/Home';

function mapStateToProps(state, props) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
