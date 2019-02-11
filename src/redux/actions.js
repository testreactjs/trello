import { createAction } from 'redux-actions';
import * as types from './types';

// cards
export const addCardAction = createAction(types.ADD_CARD);
export const deleteCardAction = createAction(types.DELETE_CARD);
export const changeTitleCardAction = createAction(types.CHANGE_TITLE_CARD);
export const changeDescriptionCardAction = createAction(types.CHANGE_DESCRIPTION_CARD);

// lists
export const changeTitleListAction = createAction(types.CHANGE_TITLE_LIST);

// comments
export const addCommentAction = createAction(types.ADD_COMMENT);
export const editCommentAction = createAction(types.EDIT_COMMENT);
export const delCommentAction = createAction(types.DEL_COMMENT);
