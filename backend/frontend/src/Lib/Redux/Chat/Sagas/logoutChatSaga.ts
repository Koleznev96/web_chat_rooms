import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import { CHAT_ENUM } from '../../../../Containers/Chat/ChatContainer';
import { chatService } from '../../../../Services/chat.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import { menuActions } from '../../Menu/Actions/menuActions';
import { EnumItemsMenu } from '../../Menu/slice';
import { chatActions } from '../Actions/ChatActions';

function* logoutChatSaga(action: PayloadAction<number>) {
	try {
		yield* put(
			menuActions.handler({
				address: `${EnumItemsMenu.CHAT}>${CHAT_ENUM.LIST}`,
			}),
		);

		// const response_current: Response = yield restaurantService.getById(action.payload);
		// const data_current: Restaurant[] = yield response_current.json();
		// yield* put(restaurantsActions.entryCurrent(data_current));
		// yield* put(restaurantsActions.getMenuListToCurrent());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'logoutChatSaga'});
	}
}

export default logoutChatSaga;
