import {takeEvery} from 'typed-redux-saga';
import {socketActions} from './Actions/SocketActions';
import getNotificationsSaga from './Sagas/getNotificationsSaga';

export default function* socketSagaWatcher() {
	yield* takeEvery([socketActions.connection.type], getNotificationsSaga);
}
