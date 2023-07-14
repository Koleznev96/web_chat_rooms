import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectMenuState = (state: any) => {
	return state[EnumStore.MENU];
};
