import {PrepareAction} from '@reduxjs/toolkit';

import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	USER_LOGIN = 'USER_LOGIN',
	USER_LOGOUT = 'USER_LOGOUT',
	USER_UPDATE = 'USER_UPDATE',
}

class UserClientOnlyActions extends ClientOnlyActions<EnumStore.USER> {
	readonly scope = EnumStore.USER;

	login = this.createAction(EnumActions.USER_LOGIN);

	logout = this.createAction(EnumActions.USER_LOGOUT);

	update = this.createAction(EnumActions.USER_UPDATE);
}

export const userClientOnlyActions = new UserClientOnlyActions();
