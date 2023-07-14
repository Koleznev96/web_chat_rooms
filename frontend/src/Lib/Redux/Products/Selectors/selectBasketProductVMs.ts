import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectBasketProductIds} from './selectBasketProductIds';
import {selectProductsState} from './selectProductsState';
import {selectProductsVMs} from './selectProductsVMs';

export const selectBasketProductVMs = createSelector([selectProductsState], (state) =>
	_.filter(state.data, (item) => state.basket.indexOf(item.id) !== -1),
);
