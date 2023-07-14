import React, {FC, useEffect, useState, useRef} from 'react';
import {Task} from 'redux-saga';
import {useDispatch} from 'react-redux';
import RootSaga from '../Lib/Redux/RootSaga';
import startRootSaga from '../Lib/Redux/startRootSaga';
import sagaMiddleware from '../Middleware/sagaMiddleware';
import Spinner from './Spinner/Spinner';
import RouterContainer from '../Routes/RouterContainer';

const LocalizedThemedApp: FC = () => {
	const dispatch = useDispatch();

	const sagaRunner = useRef<Task>();
	const [isClientReady, setIsClientReady] = useState(false);

	useEffect(() => {
		sagaRunner.current = startRootSaga(sagaMiddleware, RootSaga);
		setIsClientReady(true);
	}, [dispatch]);

	return isClientReady ? (
		<>
			<RouterContainer />
		</>
	) : (
		<Spinner />
	);
};

export default LocalizedThemedApp;
