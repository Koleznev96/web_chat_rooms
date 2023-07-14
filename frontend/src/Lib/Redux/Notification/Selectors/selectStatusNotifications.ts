import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectNotificationState} from './selectNotificationState';

export const selectStatusNotifications = createSelector(
	[selectNotificationState],
	(notificationState) => {
		return _.isUndefined(notificationState) ? undefined : notificationState.allowNotification;
	},
);
