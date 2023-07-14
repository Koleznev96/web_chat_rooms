import React from 'react';

import './ChatList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import { Chat } from '../../../Lib/Redux/Chat/slice';

type IDishListProps = {
	data: Chat;
	onHandlerClick: (value: Chat) => void;
	itemClick: (value: Chat) => void;
};

const ChatItem = (props: IDishListProps) => {
	const {data, onHandlerClick, itemClick} = props;
	return (
		<div onClick={() => onHandlerClick(data)} className="dishes-list__item">
			<div className="dishes-list__item__header">
				<div className="dishes-list__item__header__name CustomFontMedium">{data.name}</div>
				<div className="dishes-list__item__header__status -is-online CustomFontRegular">
					<div className="dishes-list__item__header__status__cr -is-online"></div>
					Online
				</div>
			</div>
			{/* <div className="dishes-list__item__address CustomFontRegular">{data.price}</div> */}
			<div className='product-list__item__add' onClick={(e) => {
e.stopPropagation();
itemClick(data);
			}}>{'Войти'}</div>
		</div>
	);
};

export default ChatItem;
