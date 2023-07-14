import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import { productService } from '../../../../Services/product.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import { productsActions } from '../Actions/ProductsActions';
import {Product} from '../slice';

function* createProductSaga(action: PayloadAction<Product>) {
	try {
		const response: Response = yield productService.create(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: Product = yield response.json();
			yield* put(popupActions.close());
			yield* put(productsActions.handler(data.id));
		}
		yield* put(productsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default createProductSaga;
