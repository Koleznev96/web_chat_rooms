import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import { productService } from '../../../../Services/product.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import { productsActions } from '../Actions/ProductsActions';

function* deleteProductSaga(action: PayloadAction<number>) {
	try {
		const response: Response = yield productService.delete(action.payload);
		if (response.status === 200 || response.status === 201 || response.status === 204) {
			console.log('gg')
		}
		yield* put(productsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default deleteProductSaga;
