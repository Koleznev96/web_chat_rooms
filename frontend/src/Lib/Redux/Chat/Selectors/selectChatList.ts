import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import { selectChatState } from './selectChatState';

export const selectChatList = createSelector([selectChatState], (chatState) => {
	return _.isUndefined(chatState) ? undefined : chatState.data;
});
