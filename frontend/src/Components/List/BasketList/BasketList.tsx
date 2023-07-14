import React from 'react';

import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {Product} from '../../../Lib/Redux/Products/slice';
import ProductElement from '../../Element/ProductElement/ProductElement';
import {selectBasketProductVMs} from '../../../Lib/Redux/Products/Selectors/selectBasketProductVMs';
import { productsActions } from '../../../Lib/Redux/Products/Actions/ProductsActions';
import { useDispatch } from 'react-redux';

const BasketList = () => {
	const productsData = useStoreSelector(selectBasketProductVMs);
	const dispatch = useDispatch();

	console.log('productsData-', productsData)

	return (
		<List id={'list-products'} label={'Products'}>
			{productsData?.map((item: Product) => (
				<ProductElement
					key={item.id}
					itemClickHandler={() => console.log('Click...')}
					item={item}
					isInBasket={true}
					itemClickBasket={(item: Product) => dispatch(productsActions.deleteProductToBasket(item.id))}
				/>
			))}
		</List>
	);
};

export default BasketList;
