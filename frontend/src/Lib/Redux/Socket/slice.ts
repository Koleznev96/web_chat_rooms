import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {socketActions} from './Actions/SocketActions';

const initialState = {
	connection: null,
	isLoading: false,
	isErorr: false,
};

export const socketSlice = createSlice<SocketType, SliceCaseReducers<SocketType>, EnumStore>({
	name: EnumStore.SOCKET,
	initialState,
	reducers: {},
	extraReducers: {
		[socketActions.connection.type]: (state, action) => {
			state.connection = action.payload;
		},
	},
});

export interface SocketType {
	connection: WebSocket | null;
	isLoading: boolean;
	isErorr: boolean;
}

export const socketReducer = socketSlice.reducer;
