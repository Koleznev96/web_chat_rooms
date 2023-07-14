import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import LocalizedThemedApp from './Components/LocalizedThemedApp';
import Popup from './Components/Popup/Popup';

import {store} from './Lib/Redux/store';

const AppDesktop = () => {
	return (
		<Provider store={store}>
			<Popup />
			<BrowserRouter>
				<LocalizedThemedApp />
			</BrowserRouter>
		</Provider>
	);
};

export default AppDesktop;
