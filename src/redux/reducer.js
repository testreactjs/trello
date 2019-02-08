import { createStore, combineReducers } from 'redux';
import { createAction, createActions, handleActions, combineActions } from 'redux-actions';
import cardReducer from './card-reducer';

const initialStateCard = [
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

const actionAdd = {
  type: 'ADD_CARD',
  listId: 1,
  userId: 1,
  id: 3,
  title: 'test',
  text: 'test2',
};

const testDel = id => ({
  type: 'REMOVE_CARD',
  id,
});

const actionDel = {
  type: 'REMOVE_CARD',
  id: 3,
};

const store = createStore(cardReducer, initialStateCard);
// store.subscribe(() => console.log('change store'));

const logState = () => console.log('next state', store.getState());
const unsubscribeLogger = store.subscribe(logState);
// console.log(reducerCards(initialStateCard, actionAdd));
// console.log(reducerCards(initialStateCard, actionDel));
// console.log(store.getState());
console.log(store.dispatch(testDel(1)));
console.log(store.dispatch(actionAdd));
// console.log(store.getState());

/*
function reducer(state = initialStateCard, action) {}

const store = createStore(reducer);
// store.dispatch();

const addCard = createAction('ADDCARD');
const delCard = createAction('DELCARD');

const reducer = handleActions(
  {
    [addCard]: (state, action) => {
      console.log('addCard');
      const cards = () => handleCardAdd(state, action.payload);
      return [...state, cards];
    },
    [delCard]: (state, { payload: { id } }) => {
      return { ...state, cars: delCard(id) };
    },
  },
  defaultState,
);

console.log(addCard('test new card'));
console.log(defaultState);
*/
/*
const defaultState = { counter: 10 };
const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount }),
  DECREMENT: (amount = 1) => ({ amount: -amount }),
});

const reducer = handleActions(
  {
    [combineActions(increment, decrement)]: (state, { payload: { amount } }) => {
      return { ...state, counter: state.counter + amount };
    },
  },
  defaultState,
);
*/

console.log('the end redux..............................');
