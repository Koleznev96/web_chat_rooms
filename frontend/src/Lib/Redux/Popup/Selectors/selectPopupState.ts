import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectPopupState = (state: any) => {
	return state[EnumStore.POPUP];
};
