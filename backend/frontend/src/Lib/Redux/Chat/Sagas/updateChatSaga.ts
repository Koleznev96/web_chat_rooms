import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {chatService} from '../../../../Services/chat.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {chatActions} from '../Actions/ChatActions';
import {Chat} from '../slice';

function* updateChatSaga(action: PayloadAction<Chat>) {
	try {
		const response: Response = yield chatService.update(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: Chat = yield response.json();
			yield* put(popupActions.close());
			// yield* put(chatActions.handler(data.id));
		}
		yield* put(chatActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default updateChatSaga;
