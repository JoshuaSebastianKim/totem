import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { webFrame } from 'electron';
import Root from './containers/Root';
import { configureStore, history } from './redux/configureStore';
import './app.global.scss';

webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

const store = configureStore();

render(
	<AppContainer>
		<Root store={store} history={history} />
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
		render(
			<AppContainer>
				<NextRoot store={store} history={history} />
			</AppContainer>,
			document.getElementById('root')
		);
	});
}
