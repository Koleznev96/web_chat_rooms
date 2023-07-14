import React, {useState} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {useDispatch} from 'react-redux';
import {productsActions} from '../../Lib/Redux/Products/Actions/ProductsActions';
import { popupActions } from '../../Lib/Redux/Popup/Actions/PopupActions';

export type IRestaurantProps = {
	id?: number;
	name?: string;
	short_desc?: string;
	description?: string;
	image?: string;
	price?: number;
};

type ICreateRestaurantProps = {
	data: IRestaurantProps | null;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
	okHandler?: (data: IRestaurantProps) => void;
};

const CreateProduct = (props: ICreateRestaurantProps) => {
	const {data, cancalHandler, isVertical} = props;
	const [name, setName] = useState<string>(data?.name || '');
	const [short_desc, setshort_desc] = useState<string>(data?.short_desc || '');
	const [description, setdescription] = useState<string>(data?.description || '');
	const [image, setimage] = useState<string>(data?.image || '');
	const [price, setprice] = useState<number>(data?.price || 0);
	const [error, seterror] = useState<boolean>(false);
	const dispatch = useDispatch();

	const title = _.isUndefined(data?.id) ? 'Create restaurant' : null;

	const saveButtonHandler = () => {
		if (name.length < 1 || short_desc.length < 1 || description.length < 1 || image.length < 1 || price === undefined || price < 0) {
			seterror(true);
			return;
		}
		seterror(false);
		dispatch(
			_.isUndefined(data?.id)
				? productsActions.create({name, short_desc, description, image, price})
				: productsActions.update({
						...data,
						id: data?.id,
						name,
						short_desc,
						description,
						image,
						price,
				}),
		);
		props.okHandler &&
			props.okHandler({...props.data, name, short_desc, description, image, price});
	};

	const ddelete = () => {
		dispatch(
			productsActions.delete(data?.id)
		);
		dispatch(
			popupActions.close()
		);
	}

	return (
		<>
			{title ? <div className="box-create__title CustomFontSemiBold">{title}</div> : null}
			{!_.isUndefined(data?.id) && <div className="box-create__del CustomFontSemiBold" onClick={ddelete}>Удалить</div>}
			<div className={`box-create ${isVertical && '--is-vertical'}`}>
				<div className={`box-create__wrapper ${isVertical && '--margin --max'}`}>
					<div className="box-create__input__label CustomFontRegular">Name</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={name}
						type="text"
						placeholder="Name"
						onChange={(value) => setName(value.target.value)}
					/>
					<div className="box-create__input__label CustomFontRegular">short_desc</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={short_desc}
						type="text"
						placeholder="Address"
						onChange={(value) => setshort_desc(value.target.value)}
					/>
					<div className="box-create__input__label CustomFontRegular">description</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={description}
						type="text"
						placeholder="Address"
						onChange={(value) => setdescription(value.target.value)}
					/>
					<div className="box-create__input__label CustomFontRegular">price</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={price}
						type="text"
						placeholder="Address"
						onChange={(value) => setprice(Number(value.target.value))}
					/>
					<div className="box-create__input__label CustomFontRegular">Image</div>
					<input
        type="file"
        name="image"
        onChange={(event: any) => {
          console.log(event.target.files[0]);
          setimage(event.target.files[0]);
        }}
      />
				</div>
				<div className='error'>
					{error && 'Ошибка!!!'}
				</div>
				<div className={`box-create__wrapper --line ${isVertical && '--end'}`}>
					<div
						onClick={cancalHandler}
						className="box-create__button --default --margin CustomFontMedium"
					>
						Отменить
					</div>
					<div onClick={saveButtonHandler} className="box-create__button --save CustomFontMedium">
						Сохранить
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateProduct;
