import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {menuActions} from './Actions/menuActions';

export enum EnumItemsMenu {
	HOME = 'home',
	BASKET = 'basket',
	PRODCTS = 'products',
	CHAT = 'chat',
}

const initialState = {address: `${EnumItemsMenu.CHAT}>`};

export const menuSlice = createSlice<MenuType, SliceCaseReducers<MenuType>, EnumStore>({
	name: EnumStore.MENU,
	initialState,
	reducers: {},
	extraReducers: {
		[menuActions.handler.type]: (state, action) => {
			state.prev_address = state.address;
			state.address = action.payload.address;
		},
	},
});

export interface MenuType {
	address: string;
	prev_address?: string;
	next_address?: string;
}

export const menuReducer = menuSlice.reducer;
