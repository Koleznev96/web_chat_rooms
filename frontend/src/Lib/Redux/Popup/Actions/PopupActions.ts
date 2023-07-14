import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	OPEN_POPUP = 'OPEN_POPUP',
	CLOSE_POPUP = 'CLOSE_POPUP',
}

class PopupActions extends ClientOnlyActions<EnumStore.POPUP> {
	readonly scope = EnumStore.POPUP;

	open = this.createAction(EnumActions.OPEN_POPUP);

	close = this.createAction(EnumActions.CLOSE_POPUP);
}

export const popupActions = new PopupActions();
