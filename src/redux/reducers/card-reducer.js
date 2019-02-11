import { handleActions } from 'redux-actions';
import * as types from '../types';
import { fakeCards } from '../fake-data';

export const initialStateCards = fakeCards;

export const cardReducer = handleActions(
  {
    [types.ADD_CARD]: (state, action) => {
      const {
        payload: { id, title },
      } = action;
      const lastCard = state[state.length - 1];
      return [...state, { userId: lastCard.userId, listId: id, id: lastCard.id + 1, title }];
    },
    [types.DELETE_CARD]: (state, action) => {
      const { id } = action.payload;
      return [...state.filter(card => card.id !== id)];
    },
    [types.CHANGE_TITLE_CARD]: (state, action) => {
      const { title, id } = action.payload;
      return state.map(card => {
        if (card.id === id) {
          return { ...card, title };
        }
        return card;
      });
    },
    [types.CHANGE_DESCRIPTION_CARD]: (state, action) => {
      const { text, id } = action.payload;
      return state.map(card => {
        if (card.id === id) {
          return { ...card, text };
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
