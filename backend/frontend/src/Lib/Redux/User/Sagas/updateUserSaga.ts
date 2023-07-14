import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {User} from '../slice';

function* updateUserSaga({payload: user}: PayloadAction<{user: User}>) {
	try {
		yield put({type: 'LOGIN_USER_REQUEST'});
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default updateUserSaga;
