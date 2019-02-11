import { handleActions } from 'redux-actions';
import * as types from '../types';
import { fakeCards } from '../fake-data';

export const initialStateCards = fakeCards;

export const cardReducer = handleActions(
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
      return state.map(card => {
        if (action.id === card.id) {
          return { ...card, title };
        }
        return card;
      });
    },
  },
  initialStateCards,
);

// const logState = () => console.log('next state', store.getState());
// const unsubscribeLogger = store.subscribe(logState);
// console.log(reducerCards(initialStateCard, actionAdd));
// console.log(reducerCards(initialStateCard, actionDel));
// console.log(store.getState());
// console.log(store.dispatch(testDel(4)));
// console.log(store.dispatch(changetitle));
// console.log(store.getState());
