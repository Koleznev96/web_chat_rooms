import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectSocketState = (state: any) => {
	return state[EnumStore.SOCKET];
};
