import {fork} from 'typed-redux-saga';
import chatSagaWatcher from './Chat/chatSagaWatcher';
import notificationSagaWatcher from './Notification/notificationSagaWatcher';
import productsSagaWatcher from './Products/productsSagaWatcher';
import socketSagaWatcher from './Socket/socketSagaWatcher';
import userSagaWatcher from './User/userSagaWatcher';

/**
 * @link https://words.thisishugo.com/how-to-pass-an-api-client-to-a-redux-saga-f35170356c53
 * @constructor
 */
export default function* RootSaga() {
	yield* fork(userSagaWatcher);
	yield* fork(productsSagaWatcher);
	yield* fork(chatSagaWatcher);
	yield* fork(notificationSagaWatcher);
	yield* fork(socketSagaWatcher);
}
