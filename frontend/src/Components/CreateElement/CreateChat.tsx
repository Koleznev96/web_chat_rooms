import React, {useState} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {useDispatch} from 'react-redux';
import {productsActions} from '../../Lib/Redux/Products/Actions/ProductsActions';
import { popupActions } from '../../Lib/Redux/Popup/Actions/PopupActions';
import { chatActions } from '../../Lib/Redux/Chat/Actions/ChatActions';

export type IRestaurantProps = {
	id?: number;
	name?: string;
};

type ICreateRestaurantProps = {
	data: IRestaurantProps | null;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
	okHandler?: (data: IRestaurantProps) => void;
};

const CreateChat = (props: ICreateRestaurantProps) => {
	const {data, cancalHandler, isVertical} = props;
	const [name, setName] = useState<string>(data?.name || '');
	const [error, seterror] = useState<boolean>(false);
	const dispatch = useDispatch();

	const title = _.isUndefined(data?.id) ? 'Create Chat' : null;

	const saveButtonHandler = () => {
		if (name.length < 1) {
			seterror(true);
			return;
		}
		seterror(false);
		dispatch(
			_.isUndefined(data?.id)
				? chatActions.create({name})
				: chatActions.update({
						...data,
						id: data?.id,
						name,
					
				}),
		);
		props.okHandler &&
			props.okHandler({...props.data, name});
	};

	const ddelete = () => {
		dispatch(
			chatActions.delete(data?.id)
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

export default CreateChat;
