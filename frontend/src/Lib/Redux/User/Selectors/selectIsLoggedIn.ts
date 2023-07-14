import {selectUserState} from './selectUserState';
import _ from 'lodash';
import {User} from '../slice';
import {createSelector} from '../../../../Utils/Redux';

export const selectIsLoggedIn = createSelector([selectUserState], (userState: User) => userState.token !== '');
