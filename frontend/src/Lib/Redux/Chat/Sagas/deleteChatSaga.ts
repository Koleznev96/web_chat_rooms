import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {chatService} from '../../../../Services/chat.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {chatActions} from '../Actions/ChatActions';

function* deleteChatSaga(action: PayloadAction<number>) {
	try {
		const response: Response = yield chatService.delete(action.payload);
		if (response.status === 200 || response.status === 201 || response.status === 204) {
			yield* put(popupActions.close());
		}
		yield* put(chatActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default deleteChatSaga;
