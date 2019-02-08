import { createAction } from 'redux-actions';
import * as types from './types';

export const addCard = createAction(types.ADD_CARD);
export const removeCard = createAction(types.REMOVE_CARD);
export const changeTitle = createAction(types.CHANGE_TITLE_CARD);
