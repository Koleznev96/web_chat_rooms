import {createEntityAdapter} from '@reduxjs/toolkit';
import {User} from './slice';

export const userAdapter = createEntityAdapter<User>();
