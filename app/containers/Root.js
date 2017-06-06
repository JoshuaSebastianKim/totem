// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import es from 'react-intl/locale-data/es';
import Routes from '../routes';

type RootType = {
	store: {},
	history: {}
};

addLocaleData([...es]);

export default function Root({ store, history }: RootType) {
	return (
		<Provider store={store}>
			<IntlProvider locale="es-AR">
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</IntlProvider>
		</Provider>
	);
}
