import { handleActions } from 'redux-actions';
import * as types from '../types';
import { fakeLists } from './fake-data';

export const initialStateList = fakeLists;
export const listReducer = handleActions(
  {
    [types.CHANGE_TITLE_LIST]: (state, action) => {
      const { title } = action;
      const listFromState = state.concat();
      const lists = listFromState.map(list => {
        if (action.id === list.id) {
          return { ...list, title };
        }
        return list;
      });
      return [...state, lists];
    },
  },
  initialStateList,
);
