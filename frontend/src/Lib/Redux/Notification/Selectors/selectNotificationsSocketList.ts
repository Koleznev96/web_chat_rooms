import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectNotificationState} from './selectNotificationState';

export const selectNotificationsSocketList = createSelector(
	[selectNotificationState],
	(notificationState) => {
		return _.isUndefined(notificationState) ? undefined : notificationState.notificationsSocket;
	},
);
