import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	HANDLER_ITEM = 'HANDLER_ITEM',
	GET_LIST = 'GET_LIST',
	START_LOADING = 'START_LOADING',
	STOP_LOADING = 'STOP_LOADING',
	ENTRY_LIST = 'ENTRY_LIST',
	ENTRY_CURRENT = 'ENTRY_CURRENT',
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	ADD_PRODUCT_TO_BASKET = 'ADD_PRODUCT_TO_BASKET',
	DELETE_PRODUCT_TO_BASKET = 'DELETE_PRODUCT_TO_BASKET',
	TEST = 'TEST',
}

class ProductsActions extends ClientOnlyActions<EnumStore.PRODDUCTS> {
	readonly scope = EnumStore.PRODDUCTS;

	create = this.createAction(EnumActions.CREATE);

	update = this.createAction(EnumActions.UPDATE);

	delete = this.createAction(EnumActions.DELETE);

	handler = this.createAction(EnumActions.HANDLER_ITEM);

	getList = this.createAction(EnumActions.GET_LIST);

	startLoading = this.createAction(EnumActions.START_LOADING);

	stopLoading = this.createAction(EnumActions.STOP_LOADING);

	entryList = this.createAction(EnumActions.ENTRY_LIST);

	entryCurrent = this.createAction(EnumActions.ENTRY_CURRENT);

	addProductToBasket = this.createAction(EnumActions.ADD_PRODUCT_TO_BASKET);

	deleteProductToBasket = this.createAction(EnumActions.DELETE_PRODUCT_TO_BASKET);

	testing = this.createAction(EnumActions.TEST);
}

export const productsActions = new ProductsActions();
