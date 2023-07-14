import {takeEvery} from 'typed-redux-saga';
import {productsActions} from './Actions/ProductsActions';
import createProductSaga from './Sagas/createProductSaga';
import deleteProductSaga from './Sagas/deleteProductSaga';
import getProductsSaga from './Sagas/getProductsSaga';
import updateProductSaga from './Sagas/updateProductSaga';

export default function* productsSagaWatcher() {
	yield* takeEvery([productsActions.getList.type], getProductsSaga);
	yield* takeEvery(productsActions.create.type, createProductSaga);
	yield* takeEvery(productsActions.update.type, updateProductSaga);
	yield* takeEvery(productsActions.delete.type, deleteProductSaga);
	
}
