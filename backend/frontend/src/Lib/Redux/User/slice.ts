import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {userClientOnlyActions} from './Actions/userClientOnlyActions';
import {getWithExpiry, initialUser} from './initialData';

const init = getWithExpiry(EnumStore.USER);
const initialState = init !== null ? init : initialUser;

export const userSlice = createSlice<User, SliceCaseReducers<User>, EnumStore>({
	name: EnumStore.USER,
	initialState,
	reducers: {},
	extraReducers: {
		[userClientOnlyActions.login.type]: (state, action) => {
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			localStorage.setItem(EnumStore.USER, JSON.stringify(state));
		},
		[userClientOnlyActions.logout.type]: (state) => {
			state.email = '';
			state.token = '';
			state.refreshToken = '';
			localStorage.setItem(EnumStore.USER, JSON.stringify(state));
		},
		[userClientOnlyActions.update.type]: (state, action) => {
			state.token = action.payload.token;
			localStorage.removeItem(EnumStore.USER);
		},
	},
});

export interface User {
	email: string;
	token: string;
	refreshToken: string;
}

export interface UserInit {
	user: User;
}

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
