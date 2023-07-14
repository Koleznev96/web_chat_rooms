import React from 'react';

import './ChatContainer.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';

import ChatList from '../../Components/List/ChatList/ChatList';
import { THomeContainerProps } from '../Home/HomeContainer';
import ChatRoom from '../../Components/ChatRoom/ChatRoom';


export enum CHAT_ENUM {
	LIST = 'LIST',
	CHAT_ROOM = 'CHAT_ROOM'
}

const ChatContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[1];
	switch (menu_item) {
		case CHAT_ENUM.LIST:
			return <ChatList />;
		case CHAT_ENUM.CHAT_ROOM:
			return <ChatRoom />;
		default:
			return <ChatList />;
	}
};

export default ChatContainer;
