import { handleActions } from 'redux-actions';
import * as types from '../types';
import { fakeUsers } from './fake-data';

export const initialStateUsers = fakeUsers;
export const userReducer = handleActions({}, initialStateUsers);
