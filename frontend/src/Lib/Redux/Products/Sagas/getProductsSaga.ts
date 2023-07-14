import {put} from 'typed-redux-saga';
import {productService} from '../../../../Services/product.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {productsActions} from '../Actions/ProductsActions';
import {Product} from '../slice';

function* getProductsSaga() {
	try {
		const response: Response = yield productService.getList();
		const data: Product[] = yield response.json();
		yield* put(productsActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getProductsSaga'});
	}
}

export default getProductsSaga;
