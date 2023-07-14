import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	GET_LIST = 'GET_LIST',
	ENTRY_LIST_PUSH = 'ENTRY_LIST_PUSH',
	ENTRY_LIST_SOCKET = 'ENTRY_LIST_SOCKET',
	ADD_NOTIFICATION_PUSH = 'ADD_NOTIFICATION_PUSH',
	ADD_NOTIFICATION_SOCKET = 'ADD_NOTIFICATION_SOCKET',
	DELETE_NOTIFICATION_PUSH = 'DELETE_NOTIFICATION_PUSH',
	DELETE_NOTIFICATION_SOCKET = 'DELETE_NOTIFICATION_SOCKET',
	CONNECT = 'CONNECT',
	ALLOW_NOTIFICATIONS = 'ALLOW_NOTIFICATIONS',
}

class NotificationActions extends ClientOnlyActions<EnumStore.CHAT> {
	readonly scope = EnumStore.CHAT;

	getList = this.createAction(EnumActions.GET_LIST);

	entryListPush = this.createAction(EnumActions.ENTRY_LIST_PUSH);

	entryListSocket = this.createAction(EnumActions.ENTRY_LIST_SOCKET);

	addNotificationPush = this.createAction(EnumActions.ADD_NOTIFICATION_PUSH);

	addNotificationSocket = this.createAction(EnumActions.ADD_NOTIFICATION_SOCKET);

	deleteNotificationPush = this.createAction(EnumActions.DELETE_NOTIFICATION_PUSH);

	deleteNotificationSocket = this.createAction(EnumActions.DELETE_NOTIFICATION_SOCKET);

	connect = this.createAction(EnumActions.CONNECT);

	allowNotifications = this.createAction(EnumActions.ALLOW_NOTIFICATIONS);
}

export const notificationActions = new NotificationActions();
