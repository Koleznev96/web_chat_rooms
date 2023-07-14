import {ApiUrl} from '../const';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const notificationService = {
	registrationToken,
};

async function registrationToken(token: string) {
	return fetchWrapper.post(`${ApiUrl}/notifications/tokens/`, {token});
}
