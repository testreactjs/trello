import { handleActions } from 'redux-actions';
import * as types from '../types';
import { fakeLists } from '../fake-data';

export const initialStateList = fakeLists;
export const listReducer = handleActions(
  {
    [types.CHANGE_TITLE_LIST]: (state, action) => {
      const {
        payload: { id, title },
      } = action;
      return state.map(list => {
        if (id === list.id) {
          return { ...list, title };
        }
        return list;
      });
    },
  },
  initialStateList,
);
