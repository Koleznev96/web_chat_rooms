import {ApiUrl} from '../const';
import {fetchWrapper} from '../Utils/fetch-wrapper';

type TChat = {
	id: number;
	name: string;
};

export const chatService = {
	getList,
	getById,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/chat-rooms/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/chat-rooms/${id}/`);
}

async function create(chat: TChat) {
	return fetchWrapper.post(`${ApiUrl}/chat-rooms/`, chat);
}

async function update(chat: TChat) {
	return fetchWrapper.put(`${ApiUrl}/chat-rooms/${chat.id}/`, chat);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/chat-rooms/${id}/`);
}
