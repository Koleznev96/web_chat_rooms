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
// import {fetchToken, onMessageListener} from './firebase';

import useFirebaseMessaging from '@useweb/use-firebase-messaging';

const PanelContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[0];
	const dispatch = useDispatch();
	const notificationsSocketList = useStoreSelector(selectNotificationsSocketList);
	const notificationsPushList = useStoreSelector(selectNotificationsPushList);
	// const [isTokenFound, setTokenFound] = useState(false);
	// fetchToken(setTokenFound);

	useEffect(() => {
		dispatch(productsActions.getList());
	}, []);

	const firebaseMessaging = useFirebaseMessaging({
		onMessage: (message) => {
			console.log(`Received foreground message`, message);
			dispatch(
				notificationActions.addNotificationSocket({
					message: message?.notification?.title || message?.data?.title,
				}),
			);
			//   snackbar.show({
			// 	message: message?.notification?.title || message?.data?.title,
			//   })
		},
	});

	useEffect(() => {
		firebaseMessaging.init();
	}, []);

	// onMessageListener()
	// 	.then((payload: any) => {
	// 		dispatch(notificationActions.addNotificationSocket({message: payload.notification.body}));
	// 		console.log(payload);
	// 	})
	// 	.catch((err) => console.log('failed: ', err));

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
			case EnumItemsMenu.BASKET:
				return <BasketList />;
			case EnumItemsMenu.PRODCTS:
				return <ProductList />;
			case EnumItemsMenu.CHAT:
				return <ChatContainer {...props} />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="alerts_list">
				{firebaseMessaging.initializing && (
					<div>Initializing Firebase Messaging (enable notifications for this page)</div>
				)}
				{firebaseMessaging.error && <div>{firebaseMessaging.error.toString()}</div>}
				{firebaseMessaging.fcmRegistrationToken && (
					<div>FCM Registration Token:{firebaseMessaging.fcmRegistrationToken}</div>
				)}
				<div>{firebaseMessaging.fcmRegistrationToken}</div>
				{notificationsSocketList?.map((item: any, index: number) => (
					<Alert
						key={item.id}
						className="alert_item"
						onClose={() => dispatch(notificationActions.deleteNotificationSocket(index))}
					>
						{item.message}
					</Alert>
				))}
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
