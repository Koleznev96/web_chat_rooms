import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectNotificationState = (state: any) => {
	return state[EnumStore.NOTIFICATION];
};
