import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {productsActions} from './Actions/ProductsActions';

const BASKET = 'BASKET';

function getData(key: string) {
	const valueStr: string | null = localStorage.getItem(key);
	if (!valueStr) {
		return null;
	}
	const value = JSON.parse(valueStr);
	return value;
}

const initialState = {
	data: [],
	basket: getData(BASKET) || [],
	isLoading: false,
	isErorr: false,
};

export const productsSlice = createSlice<ProductsType, SliceCaseReducers<ProductsType>, EnumStore>({
	name: EnumStore.PRODDUCTS,
	initialState,
	reducers: {},
	extraReducers: {
		[productsActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[productsActions.entryList.type]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
		[productsActions.addProductToBasket.type]: (state, action) => {
			if (state.basket.indexOf(action.payload) === -1) {
				const new_basket = [...state.basket];
				new_basket.push(action.payload);
				state.basket = [...new_basket];
				localStorage.setItem(BASKET, JSON.stringify(state.basket));
			}
		},
		[productsActions.deleteProductToBasket.type]: (state, action) => {
			const index = state.basket.indexOf(action.payload);
			if (index !== -1) {
				const new_basket = [...state.basket];
				new_basket.splice(index, 1);
				state.basket = [...new_basket];
				localStorage.setItem(BASKET, JSON.stringify(state.basket));
			}
		},
		
	},
});

export type Categories = {
	id: number;
	name: string;
};

export type Comments = {
	id: number;
	user_name: string;
	text: string;
	rate: number;
	product: number;
};

export type Product = {
	id: number;
	name: string;
	short_desc: string;
	description: string;
	image: string;
	price: number;
	categories?: Categories[];
	comments?: Comments[];
};

export interface ProductsType {
	data: Product[];
	basket: number[];
	isLoading: boolean;
	isErorr: boolean;
}

export const productsReducer = productsSlice.reducer;
