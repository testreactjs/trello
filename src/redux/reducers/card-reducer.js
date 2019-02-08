import { handleActions, combineActions } from 'redux-actions';
import { createStore, combineReducers } from 'redux';
import * as types from '../types';
/*
export const constants = {
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  CHANGE_TITLE_CARD: 'CHANGE_TITLE_CARD',
};

const cardReducer = (state, action) => {
  switch (action.type) {
    case constants.ADD_CARD:
      return [
        ...state,
        {
          listId: action.listId,
          userId: action.userId,
          id: action.id,
          title: action.title,
          text: action.text,
        },
      ];
    case constants.REMOVE_CARD:
      return [...state.filter(card => card.id != action.id)];
    case constants.CHANGE_TITLE_CARD: {
      const { title } = action;
      const cardsFromState = state.concat();
      const cards = cardsFromState.map(card => {
        if (action.id === card.id) {
          return { ...card, title };
        }
        return card;
      });
      return [...state, cards];
    }
    default:
      return state;
  }
};
*/
const defaultState = [
  {
    listId: 7,
    userId: 19,
    id: 1,
    title: 'voluptatem aliquid',
    text: 'aliquam non inventore veritatis ut quis assumenda numquam illum labore',
  },
  {
    listId: 1,
    userId: 15,
    id: 2,
    title: 'debitis tempore',
    text: 'sit ullam mollitia optio minima rerum amet laudantium blanditiis occaecati',
  },
];

const cardReducer = handleActions(
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
  defaultState,
);

const logState = () => console.log('next state', store.getState());
const unsubscribeLogger = store.subscribe(logState);
// console.log(reducerCards(initialStateCard, actionAdd));
// console.log(reducerCards(initialStateCard, actionDel));
// console.log(store.getState());
// console.log(store.dispatch(testDel(4)));
console.log(store.dispatch(changetitle));
console.log(store.getState());

export default cardReducer;
