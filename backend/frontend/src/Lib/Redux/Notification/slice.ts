import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {notificationActions} from './Actions/NotificationActions';

const initialState = {
	notificationsPush: [],
	notificationsSocket: [],
	connectionSocket: undefined,
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
	},
});

export type Notification = {
	message: string;
};

export interface NotificationType {
	notificationsPush: Notification[];
	notificationsSocket: Notification[];
	connectionSocket: WebSocket | undefined;
	isLoading: boolean;
	isErorr: boolean;
}

export const notificationReducer = notificationSlice.reducer;
