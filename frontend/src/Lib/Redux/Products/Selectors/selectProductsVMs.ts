import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectProductsState} from './selectProductsState';

export const selectProductsVMs = createSelector([selectProductsState], (state) => state.data);
