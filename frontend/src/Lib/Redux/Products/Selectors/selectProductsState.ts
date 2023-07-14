import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectProductsState = (state: any) => {
	return state[EnumStore.PRODDUCTS];
};
