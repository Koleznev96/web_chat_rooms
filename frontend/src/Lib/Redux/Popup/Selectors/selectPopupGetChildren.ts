import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectPopupState} from './selectPopupState';

export const selectPopupGetChildren = createSelector(
	[selectPopupState],
	(popupState) => popupState.children,
);
