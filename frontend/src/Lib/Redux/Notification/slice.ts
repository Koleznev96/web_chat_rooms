import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {notificationActions} from './Actions/NotificationActions';

function getData(key: string) {
	const valueStr: string | null = localStorage.getItem(key);
	if (!valueStr) {
		return null;
	}
	const value = JSON.parse(valueStr);
	return value;
}

const NOTIFI = 'NOTIFI';

const initialState = {
	notificationsPush: [],
	notificationsSocket: [],
	connectionSocket: undefined,
	allowNotification: getData(NOTIFI) || false,
	isLoading: false,
	isErorr: false,
};

export const notificationSlice = createSlice<
	NotificationType,
	SliceCaseReducers<NotificationType>,
	EnumStore
>({
	name: EnumStore.NOTIFICATION,
	initialState,
	reducers: {},
	extraReducers: {
		[notificationActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[notificationActions.entryListPush.type]: (state, action) => {
			state.notificationsPush = action.payload;
			state.isLoading = false;
		},
		[notificationActions.entryListSocket.type]: (state, action) => {
			state.notificationsSocket = action.payload;
			state.isLoading = false;
		},
		[notificationActions.addNotificationPush.type]: (state, action) => {
			state.notificationsPush.push(action.payload);
		},
		[notificationActions.addNotificationSocket.type]: (state, action) => {
			state.notificationsSocket.push(action.payload);
		},
		[notificationActions.deleteNotificationPush.type]: (state, action) => {
			state.notificationsPush = state.notificationsPush.filter(
				(item, index) => index !== action.payload,
			);
		},
		[notificationActions.deleteNotificationSocket.type]: (state, action) => {
			state.notificationsSocket = state.notificationsSocket.filter(
				(item, index) => index !== action.payload,
			);
		},
		[notificationActions.connect.type]: (state, action) => {
			state.connectionSocket = action.payload;
		},
		[notificationActions.allowNotifications.type]: (state, action) => {
			state.allowNotification = true;
			localStorage.setItem(NOTIFI, JSON.stringify(true));
		},
	},
});

export type Notification = {
	message: string;
};

export interface NotificationType {
	notificationsPush: Notification[];
	notificationsSocket: Notification[];
	connectionSocket: WebSocket | undefined;
	allowNotification: boolean;
	isLoading: boolean;
	isErorr: boolean;
}

export const notificationReducer = notificationSlice.reducer;
