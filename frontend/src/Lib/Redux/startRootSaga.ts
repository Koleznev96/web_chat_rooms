import {Task, Saga, SagaMiddleware} from 'redux-saga';

let sagaRunner: Task;

const startRootSaga = (sagaMiddleware: SagaMiddleware, rootSaga: Saga): Task => {
	sagaRunner = sagaMiddleware.run(rootSaga);
	return sagaRunner;
};

export default startRootSaga;
