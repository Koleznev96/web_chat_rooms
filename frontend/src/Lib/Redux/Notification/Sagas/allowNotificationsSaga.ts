import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {chatService} from '../../../../Services/chat.service';
import {notificationService} from '../../../../Services/notification.service';
import ServiceFactory from '../../../../Services/ServiceFactory';

function* allowNotificationsSaga(action: PayloadAction<string>) {
	try {
		console.log('allowNotificationsSaga');
		const response: Response = yield notificationService.registrationToken(action.payload);
	} catch (error) {
		ServiceFactory.error(error, {saga: 'allowNotificationsSaga'});
	}
}

export default allowNotificationsSaga;
