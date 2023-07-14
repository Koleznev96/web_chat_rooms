import {takeEvery} from 'typed-redux-saga';

import updateUserSaga from './Sagas/updateUserSaga';
import {userClientOnlyActions} from './Actions/userClientOnlyActions';

export default function* userSagaWatcher() {
	yield* takeEvery(
		[
			userClientOnlyActions.login.type,
			userClientOnlyActions.logout.type,
			userClientOnlyActions.update.type,
		],
		updateUserSaga,
	);
}
