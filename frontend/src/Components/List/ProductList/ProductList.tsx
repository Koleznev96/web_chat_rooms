import React, {useCallback} from 'react';

import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {selectProductsVMs} from '../../../Lib/Redux/Products/Selectors/selectProductsVMs';
import {Product} from '../../../Lib/Redux/Products/slice';
import ProductElement from '../../Element/ProductElement/ProductElement';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateProduct from '../../CreateElement/CreateProduct';
import {useDispatch} from 'react-redux';
import {productsActions} from '../../../Lib/Redux/Products/Actions/ProductsActions';

const ProductList = () => {
	const productsData = useStoreSelector(selectProductsVMs);
	const dispatch = useDispatch();

	const addButtonHandler = useCallback(() => {
		dispatch(
			popupActions.open({
				children: (
					<CreateProduct
						data={null}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
			}),
		);
	}, [popupActions.close]);

	const itemClickHandler = useCallback((item: Product) => {
		dispatch(
			popupActions.open({
				children: (
					<CreateProduct
						data={{...item}}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
			}),
		);
	}, []);

	const addBasket = useCallback((item: Product) => {
		dispatch(productsActions.addProductToBasket(item.id))
	}, []);

	return (
		<List
			id={'list-products'}
			label={'Products7777'}
			labelAddButton={'Add prodduct'}
			addButtonHandler={addButtonHandler}
		>
			{productsData?.map((item: Product) => (
				<ProductElement
					key={item.id}
					itemClickHandler={itemClickHandler}
					item={item}
					isInBasket={false}
					itemClickBasket={addBasket}
				/>
			))}
		</List>
	);
};

export default ProductList;
