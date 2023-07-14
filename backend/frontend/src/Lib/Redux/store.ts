import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import sagaMiddleware from '../../Middleware/sagaMiddleware';
import rootReducer from '../Reducers';

export const store = configureStore({
	reducer: rootReducer,
	middleware: [sagaMiddleware],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
