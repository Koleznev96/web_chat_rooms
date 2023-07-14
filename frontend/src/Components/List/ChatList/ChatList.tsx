import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import './ChatList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import ChatItem from './ChatItem';
import { Chat } from '../../../Lib/Redux/Chat/slice';
import { chatActions } from '../../../Lib/Redux/Chat/Actions/ChatActions';
import { selectChatList } from '../../../Lib/Redux/Chat/Selectors/selectChatList';
import CreateChat from '../../CreateElement/CreateChat';
import { menuActions } from '../../../Lib/Redux/Menu/Actions/menuActions';

const ChatList = () => {
	const dishesData = useStoreSelector(selectChatList);
	console.log('dishesData-', dishesData)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(chatActions.getList());
	}, []);

	const itemClickHandler = useCallback(
		(data: Chat | null = null) => {
			dispatch(
				popupActions.open({
					children: (
						<CreateChat
							data={data}
							cancalHandler={() => dispatch(popupActions.close())}
							isVertical={true}
						/>
					),
				}),
			);
		},
		[popupActions.close],
	);

	const itemLogin = useCallback(
		(data: Chat) => {
			dispatch(chatActions.handler(data?.id));
		},
		[popupActions.close],
	);

	return (
		<List
			id={'list-chats'}
			label={'Chats'}
			labelAddButton={'Add chat'}
			addButtonHandler={itemClickHandler}
		>
			{dishesData?.map((item: Chat) => (
				<ChatItem onHandlerClick={itemClickHandler} key={item.id} data={item} itemClick={itemLogin} />
			))}
		</List>
	);
};

export default ChatList;
