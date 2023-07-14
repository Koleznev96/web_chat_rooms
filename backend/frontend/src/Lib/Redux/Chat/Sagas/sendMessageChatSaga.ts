import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {CHAT_ENUM} from '../../../../Containers/Chat/ChatContainer';
import {chatService} from '../../../../Services/chat.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {chatActions} from '../Actions/ChatActions';
import {Message} from '../slice';

function* sendMessageChatSaga(action: PayloadAction<Message>) {
	try {
		// yield* call()
		yield* put(chatActions.addMessage({...action.payload}));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'handlerChatSaga'});
	}
}

export default sendMessageChatSaga;
