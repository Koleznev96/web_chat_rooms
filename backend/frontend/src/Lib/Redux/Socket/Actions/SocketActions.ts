import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	CONNECTION = 'CONNECTION',
}

class SocketActions extends ClientOnlyActions<EnumStore.CHAT> {
	readonly scope = EnumStore.CHAT;

	connection = this.createAction(EnumActions.CONNECTION);
}

export const socketActions = new SocketActions();
