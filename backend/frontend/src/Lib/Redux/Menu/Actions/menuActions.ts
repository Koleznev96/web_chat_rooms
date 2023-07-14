import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	HANDLER_ITEM = 'HANDLER_ITEM',
}

class MenuActions extends ClientOnlyActions<EnumStore.MENU> {
	readonly scope = EnumStore.MENU;

	handler = this.createAction(EnumActions.HANDLER_ITEM);
}

export const menuActions = new MenuActions();
