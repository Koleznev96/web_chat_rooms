import React, {useEffect, useState} from 'react';

import './PanelContainer.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {THomeContainerProps} from '../Home/HomeContainer';
import {EnumItemsMenu} from '../../Lib/Redux/Menu/slice';
import {useDispatch} from 'react-redux';
import {productsActions} from '../../Lib/Redux/Products/Actions/ProductsActions';
import ProductList from '../../Components/List/ProductList/ProductList';
import BasketList from '../../Components/List/BasketList/BasketList';
import ChatContainer from '../Chat/ChatContainer';
import Alert from '@mui/material/Alert';
import {useStoreSelector} from '../../Lib/Hooks/useStoreSelector';
import {selectNotificationsSocketList} from '../../Lib/Redux/Notification/Selectors/selectNotificationsSocketList';
import {selectNotificationsPushList} from '../../Lib/Redux/Notification/Selectors/selectNotificationsPushList';
import {notificationActions} from '../../Lib/Redux/Notification/Actions/NotificationActions';
import {ApiSocket} from '../../const';
import {socketActions} from '../../Lib/Redux/Socket/Actions/SocketActions';

import {fetchToken, onMessageListener} from './firebase';
import {selectStatusNotifications} from '../../Lib/Redux/Notification/Selectors/selectStatusNotifications';
import {popupActions} from '../../Lib/Redux/Popup/Actions/PopupActions';
import AllowNotificationPopup from '../../Components/CreateElement/AllowNotificationPopup';

const PanelContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[0];
	const dispatch = useDispatch();
	const notificationsSocketList = useStoreSelector(selectNotificationsSocketList);
	const notificationsPushList = useStoreSelector(selectNotificationsPushList);
	const statusNotification = useStoreSelector(selectStatusNotifications);

	useEffect(() => {
		dispatch(productsActions.getList());
	}, []);

	useEffect(() => {
		if (!statusNotification) {
			dispatch(
				popupActions.open({
					children: (
						<AllowNotificationPopup
							cancalHandler={() => dispatch(popupActions.close())}
							isVertical={true}
						/>
					),
				}),
			);
		}
	}, []);

	onMessageListener()
		.then((payload: any) => {
			dispatch(notificationActions.addNotificationPush({message: payload.notification.body}));
			console.log(payload);
		})
		.catch((err) => console.log('failed: ', err));

	useEffect(() => {
		const connection = new WebSocket(`${ApiSocket}/notifications/`);

		dispatch(socketActions.connection(connection));
		connection.onmessage = function (e: MessageEvent) {
			dispatch(notificationActions.addNotificationSocket(JSON.parse(e.data)));
		};
	}, []);

	const renderAddress = () => {
		switch (menu_item) {
			case EnumItemsMenu.HOME:
				return <div>Home</div>;
			case EnumItemsMenu.CHAT:
				return <ChatContainer {...props} />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="alerts_list">
				{notificationsPushList?.map((item: any, index: number) => (
					<Alert
						severity="info"
						key={item.id}
						className="alert_item"
						onClose={() => dispatch(notificationActions.deleteNotificationPush(index))}
					>
						{item.message}
					</Alert>
				))}
			</div>
			{renderAddress()}
		</>
	);
};

export default PanelContainer;
