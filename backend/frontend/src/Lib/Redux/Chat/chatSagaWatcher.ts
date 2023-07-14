import {takeEvery} from 'typed-redux-saga';
import {chatActions} from './Actions/ChatActions';
import createChatSaga from './Sagas/createChatSaga';
import deleteChatSaga from './Sagas/deleteChatSaga';
import getChatSaga from './Sagas/getChatSaga';
import handlerChatSaga from './Sagas/handlerChatSaga';
import logoutChatSaga from './Sagas/logoutChatSaga';
import sendMessageChatSaga from './Sagas/sendMessageChatSaga';
import updateChatSaga from './Sagas/updateChatSaga';

export default function* chatSagaWatcher() {
	yield* takeEvery([chatActions.getList.type], getChatSaga);
	yield* takeEvery(chatActions.create.type, createChatSaga);
	yield* takeEvery(chatActions.update.type, updateChatSaga);
	yield* takeEvery(chatActions.delete.type, deleteChatSaga);
	yield* takeEvery(chatActions.handler.type, handlerChatSaga);
	yield* takeEvery(chatActions.logout.type, logoutChatSaga);
	yield* takeEvery(chatActions.sendMessage.type, sendMessageChatSaga);
}
