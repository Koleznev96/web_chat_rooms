import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ApiSocket} from '../../const';
import {useStoreSelector} from '../../Lib/Hooks/useStoreSelector';
import {chatActions} from '../../Lib/Redux/Chat/Actions/ChatActions';
import {selectChatMessageList} from '../../Lib/Redux/Chat/Selectors/selectChatMessageList';
import {selectConnect} from '../../Lib/Redux/Chat/Selectors/selectConnect';
import {selectCurrentChat} from '../../Lib/Redux/Chat/Selectors/selectCurrentChat';

import './ChatRoom.scss';

const ChatRoom = () => {
	const chatData = useStoreSelector(selectChatMessageList);
	const chatProfile = useStoreSelector(selectCurrentChat);
	const connectPush = useStoreSelector(selectConnect);
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false);

	const onLogout = useCallback(() => dispatch(chatActions.logout()), [dispatch]);

	const sendMessage = useCallback(() => {
		if (name && message && name.length > 0 && message.length > 0) {
			setIsError(false);
			if (connectPush) {
				connectPush.send(
					JSON.stringify({
						username: name,
						message: message,
					}),
				);
			}
		} else {
			setIsError(true);
		}
	}, [dispatch, name, message, connectPush, setIsError]);

	useEffect(() => {
		if (!chatProfile) return;
		const connection = new WebSocket(`${ApiSocket}/chat/${chatProfile.name}/`);

		dispatch(chatActions.connect(connection));
		connection.onmessage = function (e: MessageEvent) {
			dispatch(chatActions.addMessage(JSON.parse(e.data)));
		};
	}, [chatProfile.name]);

	return (
		<div id={'CHAT_ROOM_ID'} className="list-container">
			<div className="list-container__header">
				<div className="list-container__header__label CustomFontBold">ChatRoom</div>
				<div className="chat__logout" onClick={onLogout}>
					Logout
				</div>
			</div>
			<div className="list-container__body chat_scroll">
				{chatData?.map((item: any, index: number) => (
					<div key={index} className="chat__item">
						<div className="chat__item__name">{item.username}</div>
						<div className="chat__item__message">{item.message}</div>
					</div>
				))}
			</div>
			<div className="list-container__footer">
				<div className="chat">
					<div className="chat__error">{isError && 'Please fill all fields!!!'}</div>
					<div className="chat__element">
						<div className="chat__element__label CustomFontRegular">Your Name:</div>
						<input
							onChange={(event) => setName(event.target.value)}
							type="text"
							className="chat__element__input --name"
						/>
					</div>
					<div className="chat__element">
						<div className="chat__element__label CustomFontRegular">Your message:</div>
						<div className="chat__element__wrapper">
							<textarea
								onChange={(event) => setMessage(event.target.value)}
								className="chat__element__input --message"
							/>
							<div className="chat__element__button" onClick={sendMessage}>
								Send
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
