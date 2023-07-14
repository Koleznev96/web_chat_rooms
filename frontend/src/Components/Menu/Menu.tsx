import {HandySvg} from 'handy-svg';
import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import HomeIcon from '../../Assets/Icons/homeIcon.svg';
import ReportsIcon from '../../Assets/Icons/reportsIcon.svg';
import EmployeesIcon from '../../Assets/Icons/employeesIcon.svg';
import HomeActiveIcon from '../../Assets/Icons/homeActiveIcon.svg';
import EmployeesActiveIcon from '../../Assets/Icons/employeesActiveIcon.svg';
import ReportsActiveIcon from '../../Assets/Icons/reportsActiveIcon.svg';

import './Menu.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {EnumItemsMenu} from '../../Lib/Redux/Menu/slice';
import {THomeContainerProps} from '../../Containers/Home/HomeContainer';
import {EnumNestedAddresses} from '../../Containers/Panel/type';

const menuList = [
	{
		id: EnumItemsMenu.CHAT,
		label: 'Chats',
		icon: HomeIcon,
		iconActive: HomeActiveIcon,
	},
];

const Menu = (props: THomeContainerProps) => {
	const {handlerMenu, address} = props;
	const menu_item = address.split('>')[0];

	const menuItemHandler = useCallback(
		(id: EnumItemsMenu) => {
			handlerMenu({address: `${id}>${EnumNestedAddresses.LIST}`});
		},
		[handlerMenu],
	);

	return (
		<div className="menu-container">
			<div className="menu-list">
				{menuList.map((item) => {
					const isActive = menu_item === item.id;
					return (
						<div
							onClick={() => menuItemHandler(item.id)}
							className={`menu-item ${isActive && 'menu-item-active'}`}
							key={item.id}
						>
							{item.icon && (
								<HandySvg
									src={isActive ? item.iconActive : item.icon}
									className={`menu-item-icon ${isActive && 'menu-item-icon-active'}`}
								/>
							)}
							<div
								className={`CustomFontSemiBold menu-item-label ${
									isActive && 'menu-item-label-active'
								}`}
							>
								{item.label}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Menu;
