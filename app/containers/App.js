// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { printerInit } from '../redux/modules/printer';
import { watchIdle, resetIdleTimer, clearIdleTimer } from '../redux/modules/app';

class App extends Component {
	props: {
		children: Children,
		currentLocation: string,
		isIdle: boolean,
		hasSettings: boolean,
		onPrinterInit: () => void,
		onIdleTimerInit: () => void,
		onResetIdleTimer: () => void,
		onClearIdleTimer: () => void
	};

	componentWillMount() {
		this.initPrinter();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.hasSettings && this.props.currentLocation !== nextProps.currentLocation) {
			this.handleCurrentLocationChange(nextProps.currentLocation);
		}
	}

	handleCurrentLocationChange = (currentLocation) => {
		const { onIdleTimerInit, onResetIdleTimer, onClearIdleTimer } = this.props;

		if (currentLocation === '/') {
			onClearIdleTimer();

			document.removeEventListener('click', onResetIdleTimer);
		} else {
			onIdleTimerInit();

			document.addEventListener('click', onResetIdleTimer);
		}
	}

	initPrinter = () => {
		const { onPrinterInit } = this.props;

		onPrinterInit();
	}

	render() {
		if (!this.props.hasSettings && this.props.currentLocation !== '/settings') {
			return <Redirect to="/settings" />;
		}

		if (this.props.isIdle) {
			return <Redirect to="/" />;
		}

		return (
			<div id="app">
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentLocation: state.history.currentLocation,
		isIdle: state.app.isIdle,
		hasSettings: state.settings.hasSettings
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onPrinterInit: printerInit,
		onIdleTimerInit: watchIdle,
		onResetIdleTimer: resetIdleTimer,
		onClearIdleTimer: clearIdleTimer
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
