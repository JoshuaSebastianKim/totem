// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { printerInit } from '../redux/modules/printer';

class App extends Component {
	props: {
		children: Children,
		onPrinterInit: () => void
	};

	componentWillMount() {
		const { onPrinterInit } = this.props;

		onPrinterInit();
	}

	render() {
		return (
			<div id="app">
				{this.props.children}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onPrinterInit: printerInit
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
