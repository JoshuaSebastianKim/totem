// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import Keyboard from './KeyboardContainer';

class App extends Component {
	props: {
		children: Children
	};

	render() {
		return (
			<div id="app">
				{this.props.children}

				<Keyboard />
			</div>
		);
	}
}

export default App;
