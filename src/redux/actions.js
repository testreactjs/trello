import { createAction } from 'redux-actions';
import * as types from './types';

// cards
export const addCard = createAction(types.ADD_CARD);
export const removeCard = createAction(types.REMOVE_CARD);
export const changeTitleCard = createAction(types.CHANGE_TITLE_CARD);

// lists
export const changeTitleListAction = createAction(types.CHANGE_TITLE_LIST);
