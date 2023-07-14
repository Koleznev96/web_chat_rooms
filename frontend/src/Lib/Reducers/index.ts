import {combineReducers} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import EnumStore from '../../BusinessLogic/EnumStore';
import {chatReducer} from '../Redux/Chat/slice';
import {menuReducer} from '../Redux/Menu/slice';
import {notificationReducer} from '../Redux/Notification/slice';
import {popupReducer} from '../Redux/Popup/slice';
import {productsReducer} from '../Redux/Products/slice';
import {socketReducer} from '../Redux/Socket/slice';
import {userReducer} from '../Redux/User/slice';

const reducers = {
	[EnumStore.USER]: userReducer,
	[EnumStore.MENU]: menuReducer,
	[EnumStore.PRODDUCTS]: productsReducer,
	[EnumStore.POPUP]: popupReducer,
	[EnumStore.CHAT]: chatReducer,
	[EnumStore.NOTIFICATION]: notificationReducer,
	[EnumStore.SOCKET]: () => socketReducer,
};

const rootReducer = enableBatching(combineReducers(reducers));

export default rootReducer;
