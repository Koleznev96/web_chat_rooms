import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {chatActions} from './Actions/ChatActions';

const initialState = {
	data: [{id: 1, name: 'gggg'}],
	name: '',
	current: undefined,
	connectionSocket: undefined,
	messages: [],
	isLoading: false,
	isErorr: false,
};

export const chatSlice = createSlice<ChatsType, SliceCaseReducers<ChatsType>, EnumStore>({
	name: EnumStore.CHAT,
	initialState,
	reducers: {},
	extraReducers: {
		[chatActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[chatActions.entryList.type]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
		[chatActions.addMessage.type]: (state, action) => {
			state.messages.push(action.payload);
		},
		[chatActions.clearChatHistory.type]: (state) => {
			state.messages = [];
		},
		[chatActions.handler.type]: (state, action) => {
			const chat = state.data?.find((item) => item.id === action.payload);
			state.current = chat;
		},
		[chatActions.connect.type]: (state, action) => {
			state.connectionSocket = action.payload;
		},
	},
});

export type Chat = {
	id: number;
	name: string;
};

export type Message = {
	username: string;
	message: string;
};

export interface ChatsType {
	data: Chat[];
	current: Chat | undefined;
	messages: Message[];
	name: string;
	connectionSocket: WebSocket | undefined;
	isLoading: boolean;
	isErorr: boolean;
}

export const chatReducer = chatSlice.reducer;
