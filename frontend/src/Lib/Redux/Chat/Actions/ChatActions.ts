import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	HANDLER_ITEM = 'HANDLER_ITEM',
	GET_LIST = 'GET_LIST',
	ENTRY_LIST = 'ENTRY_LIST',
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	LOGOUT = 'LOGOUT',
	SEND_MESSAGE = 'SEND_MESSAGE',
	ADD_MESSAGE = 'ADD_MESSAGE',
	CLEAR_CHAT_HISTORY = 'CLEAR_CHAT_HISTORY',
	CONNECT = 'CONNECT',
}

class ChatActions extends ClientOnlyActions<EnumStore.CHAT> {
	readonly scope = EnumStore.CHAT;

	create = this.createAction(EnumActions.CREATE);

	update = this.createAction(EnumActions.UPDATE);

	delete = this.createAction(EnumActions.DELETE);

	handler = this.createAction(EnumActions.HANDLER_ITEM);

	getList = this.createAction(EnumActions.GET_LIST);

	entryList = this.createAction(EnumActions.ENTRY_LIST);

	logout = this.createAction(EnumActions.LOGOUT);

	sendMessage = this.createAction(EnumActions.SEND_MESSAGE);

	addMessage = this.createAction(EnumActions.ADD_MESSAGE);

	clearChatHistory = this.createAction(EnumActions.CLEAR_CHAT_HISTORY);

	connect = this.createAction(EnumActions.CONNECT);
}

export const chatActions = new ChatActions();
