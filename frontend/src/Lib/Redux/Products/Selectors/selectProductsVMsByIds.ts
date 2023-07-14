import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {getProductsIdsFromProps} from './getProductsIdsFromProps';
import {selectProductsVMs} from './selectProductsVMs';

export const selectProductsVMsByIds = createSelector(
	[selectProductsVMs, getProductsIdsFromProps],
	(products, ids) => _.filter(products, (item) => ids.indexOf(item) !== -1),
);
