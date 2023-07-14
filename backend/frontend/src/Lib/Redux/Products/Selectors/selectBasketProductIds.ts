import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectProductsState} from './selectProductsState';

export const selectBasketProductIds = createSelector(
	[selectProductsState],
	(state) => state.basket,
);
