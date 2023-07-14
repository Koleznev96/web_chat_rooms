import {HandySvg} from 'handy-svg';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import './Popup.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {useStoreSelector} from '../../Lib/Hooks/useStoreSelector';
import {selectPopupGetChildren} from '../../Lib/Redux/Popup/Selectors/selectPopupGetChildren';
import {popupActions} from '../../Lib/Redux/Popup/Actions/PopupActions';
import ClouseIcon from '../../Assets/Icons/clouseIcon.svg';
import {selectPopupGetIsView} from '../../Lib/Redux/Popup/Selectors/selectPopupGetIsView';

const Popup = () => {
	const children = useStoreSelector(selectPopupGetChildren);
	const isView = useStoreSelector(selectPopupGetIsView);
	const dispatch = useDispatch();

	const cancelHandler = useCallback(() => {
		dispatch(popupActions.close());
	}, [popupActions.close]);

	if (!isView) {
		return null;
	}

	return (
		<div className="translucent-background" onClick={cancelHandler}>
			<div className="popup" onClick={(e) => e.stopPropagation()}>
				<div className="popup__clouse" onClick={cancelHandler}>
					<HandySvg className="popup__clouse__svg" src={ClouseIcon} />
				</div>
				<div className="popup__content">{children}</div>
			</div>
		</div>
	);
};

export default Popup;
