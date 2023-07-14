import {takeEvery} from 'typed-redux-saga';
import {notificationActions} from './Actions/NotificationActions';
import allowNotificationsSaga from './Sagas/allowNotificationsSaga';
import getNotificationsSaga from './Sagas/getNotificationsSaga';

export default function* notificationSagaWatcher() {
	yield* takeEvery([notificationActions.getList.type], getNotificationsSaga);
	yield* takeEvery([notificationActions.allowNotifications.type], allowNotificationsSaga);
}
