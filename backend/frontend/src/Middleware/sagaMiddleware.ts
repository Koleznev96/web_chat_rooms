import createSagaMiddleware from 'redux-saga';
import {NavigateFunction, Location} from 'react-router';

export enum EnumSagaContext {
	ROUTER = 'router',
}

export type TSagaContext = {
	[EnumSagaContext.ROUTER]: {
		location: Location;
		navigate: NavigateFunction;
		closeModal: () => void;
	};
};

const sagaMiddleware = createSagaMiddleware<TSagaContext>();

export default sagaMiddleware;
