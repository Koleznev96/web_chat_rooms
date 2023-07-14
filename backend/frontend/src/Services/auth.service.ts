import {ApiUrl} from '../const';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const authService = {
	getToken,
};

async function getToken(username: string, password: string) {
	return fetchWrapper.post(`${ApiUrl}/auth/director/token/`, {username, password}, true);
}
