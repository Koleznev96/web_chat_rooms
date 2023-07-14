import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectPopupState} from './selectPopupState';

export const selectPopupGetIsView = createSelector(
	[selectPopupState],
	(popupState) => popupState.isView,
);
