import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {CHAT_ENUM} from '../../../../Containers/Chat/ChatContainer';
import {chatService} from '../../../../Services/chat.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {chatActions} from '../Actions/ChatActions';

function* handlerChatSaga(action: PayloadAction<number>) {
	try {
		yield* put(chatActions.clearChatHistory());
		const data_str = JSON.stringify({id: action.payload});
		yield* put(
			menuActions.handler({
				address: `${EnumItemsMenu.CHAT}>${CHAT_ENUM.CHAT_ROOM}>${data_str}`,
			}),
		);
	} catch (error) {
		ServiceFactory.error(error, {saga: 'handlerChatSaga'});
	}
}

export default handlerChatSaga;
