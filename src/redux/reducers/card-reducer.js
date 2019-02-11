import { handleActions, combineActions } from 'redux-actions';
import * as types from '../types';
import { List, Lists, PopupLogin, Card } from '../../components';
import { getData, saveData } from '../../storage';
import { getList } from '../../selectors';
import { listFactory, userFactory, cardFactory, commentFactory } from '../../factories';

const fakeLists = listFactory(10);
const fakeUsers = userFactory(20);
const fakeCards = cardFactory(200, {
  listId: fakeLists,
  userId: fakeUsers,
});
const fakeComments = commentFactory(2000, {
  userId: fakeUsers,
  cardId: fakeCards,
});

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

// const logState = () => console.log('next state', store.getState());
// const unsubscribeLogger = store.subscribe(logState);
// console.log(reducerCards(initialStateCard, actionAdd));
// console.log(reducerCards(initialStateCard, actionDel));
// console.log(store.getState());
// console.log(store.dispatch(testDel(4)));
// console.log(store.dispatch(changetitle));
// console.log(store.getState());
