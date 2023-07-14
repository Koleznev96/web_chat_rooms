import {put} from 'typed-redux-saga';
import { chatService } from '../../../../Services/chat.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import { chatActions } from '../Actions/ChatActions';
import { Chat } from '../slice';

function* getChatSaga() {
	try {
		const response: Response = yield chatService.getList();
		const data: Chat[] = yield response.json();
		yield* put(chatActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getChatSaga'});
	}
}

export default getChatSaga;
