import {ApiUrl} from '../const';
import { Product } from '../Lib/Redux/Products/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

type TProduct = {
	id: number;
	name: string;
	short_desc: string;
	description: string;
	image: any;
	price: number;
}

export const productService = {
	getList,
	getById,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/products/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/products/${id}/`);
}

async function create(product: TProduct) {
	const uploadData = await new FormData();
	uploadData.append('name', product.name)
	uploadData.append('price', String(product.price))
	uploadData.append('description', product.description)
	uploadData.append('short_desc', product.short_desc)
	uploadData.append('image', product.image, product.image.name)
	// console.log('uploadData-->', uploadData)
	// console.log('image-->', uploadData.get('image'))
	return fetchWrapper.data_form(`${ApiUrl}/products/`, uploadData, 'POST');
}

async function update(product: TProduct) {
	const uploadData = await new FormData();
	if (product.name) uploadData.append('name', product.name)
	if (product.price) uploadData.append('price', String(product.price))
	if (product.description) uploadData.append('description', product.description)
	if (product.short_desc) uploadData.append('short_desc', product.short_desc)
	if (product.image) uploadData.append('image', product.image, product.image.name)
	return fetchWrapper.data_form(`${ApiUrl}/products/${product.id}/`, uploadData, 'PUT');
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/products/${id}/`);
}

