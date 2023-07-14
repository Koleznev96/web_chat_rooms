import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectUserState = (state: any) => {
	return state[EnumStore.USER];
};
