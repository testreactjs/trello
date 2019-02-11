import { handleActions, combineActions } from 'redux-actions';
import * as types from '../types';
import { getData, saveData } from '../../storage';
import { getList } from '../../selectors';
import { listFactory, userFactory, cardFactory, commentFactory } from '../../factories';

const fakeLists = listFactory(10);

export const initialStateList = fakeLists;
export const listReducer = handleActions(
  {
    [types.ADD_CARD]: (state, action) => {
      const { payload: card } = action;
      return [...state, card];
    },
    [types.REMOVE_CARD]: (state, action) => {
      return [...state.filter(card => card.id !== action.id)];
    },
    [types.CHANGE_TITLE_CARD]: (state, action) => {
      const { title } = action;
      const cardsFromState = state.concat();
      const cards = cardsFromState.map(card => {
        if (action.id === card.id) {
          return { ...card, title };
        }
        return card;
      });
      return [...state, cards];
    },
  },
  initialStateCards,
);
