import React, {useState} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {useDispatch} from 'react-redux';
import {notificationActions} from '../../Lib/Redux/Notification/Actions/NotificationActions';
import {fetchToken} from '../../Containers/Panel/firebase';
import {popupActions} from '../../Lib/Redux/Popup/Actions/PopupActions';

type ICreateRestaurantProps = {
	cancalHandler: () => void;
	isVertical: boolean | undefined;
};

const AllowNotificationPopup = (props: ICreateRestaurantProps) => {
	const {cancalHandler, isVertical} = props;
	const dispatch = useDispatch();
	const [token, setToken] = useState('');
	fetchToken(setToken);

	const saveButtonHandler = () => {
		dispatch(notificationActions.allowNotifications(token));
		dispatch(popupActions.close());
	};

	return (
		<>
			<div className="box-create__title CustomFontSemiBold">Уведомления</div>
			<div className={`box-create ${isVertical && '--is-vertical'}`}>
				<div className={`box-create__wrapper ${isVertical && '--margin --max'}`}>
					<div className="box-create__input__label CustomFontRegular">
						Разрешитье уведомления, чтоб получать самый новые данные)))
					</div>
				</div>
				<div className={`box-create__wrapper --line ${isVertical && '--end'}`}>
					<div
						onClick={cancalHandler}
						className="box-create__button --default --margin CustomFontMedium"
					>
						Отменить
					</div>
					<div onClick={saveButtonHandler} className="box-create__button --save CustomFontMedium">
						Разрешить
					</div>
				</div>
			</div>
		</>
	);
};

export default AllowNotificationPopup;
