import { handleActions } from 'redux-actions';
import { fakeComments } from '../fake-data';
import * as types from '../types';

export const initialStateComments = fakeComments;
export const commentReducer = handleActions(
  {
    [types.ADD_COMMENT]: (state, action) => {
      const {
        payload: { text, cardId },
      } = action;
      const lastComment = state[state.length - 1];
      return [...state, { userId: lastComment.userId, cardId, id: lastComment.id + 1, text }];
    },
    [types.EDIT_COMMENT]: (state, action) => {
      const { text, id } = action.payload;
      return state.map(comment => {
        if (comment.id === id) {
          return { ...comment, text };
        }
        return comment;
      });
    },
    [types.DEL_COMMENT]: (state, action) => {
      const { id } = action.payload;
      return [...state.filter(comment => comment.id !== id)];
    },
  },
  initialStateComments,
);
