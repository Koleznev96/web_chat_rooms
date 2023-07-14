import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import './HomeContainer.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';

import PanelContainer from '../Panel/PanelContainer';
import Menu from '../../Components/Menu/Menu';
import {MenuType} from '../../Lib/Redux/Menu/slice';
import {menuActions} from '../../Lib/Redux/Menu/Actions/menuActions';
import {selectMenuState} from '../../Lib/Redux/Menu/Selectors/selectMenuState';

const HomeContainer = (props: THomeContainerProps) => {
	return (
		<div className="root-container">
			<div className="root-wrapper">
				<Menu {...props} />
				<div className="panel-container">
					<PanelContainer {...props} />
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	handlerMenu: (updates: Partial<MenuType>) => dispatch(menuActions.handler({...updates})),
});

type TContentUpsellContainerStateProps = ReturnType<typeof selectMenuState>;

export default connect(selectMenuState, mapDispatchToProps)(HomeContainer);

export type THomeContainerProps = THomeContainerConnectedDispatches &
	TContentUpsellContainerStateProps;

type THomeContainerConnectedDispatches = ReturnType<typeof mapDispatchToProps>;
