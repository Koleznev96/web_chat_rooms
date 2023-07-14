import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectNotificationState} from './selectNotificationState';

export const selectNotificationsPushList = createSelector(
	[selectNotificationState],
	(notificationState) => {
		return _.isUndefined(notificationState) ? undefined : notificationState.notificationsPush;
	},
);
