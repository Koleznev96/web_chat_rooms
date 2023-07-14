import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectChatState = (state: any) => {
	return state[EnumStore.CHAT];
};
