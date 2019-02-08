import { createStore } from 'redux';
import { createAction, createActions, handleActions, combineActions } from 'redux-actions';

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
const constants = {
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  CHANGE_TITLE_CARD: 'CHANGE_TITLE_CARD',
};

const refucerCards = (state = initialStateCard, action) => {
  switch (action.type) {
    case constants.ADD_CARD:
      return [...state, reducerCard({}, action)];
    default:
      return state;
  }
};
const reducerCard = (state = initialStateCard, action) => {
  switch (action.type) {
    case constants.CHANGE_TITLE_CARD:
      return {
        id: action.id,
      };
    case constants.ADD_CARD:
      return {
        listId: action.listId,
        userId: action.userId,
        id: action.id,
        title: action.title,
        text: action.text,
      };
    default:
      return state;
  }
};

const action = {
  type: 'ADD_CARD',
  listId: 1,
  userId: 1,
  id: 3,
  title: 'test',
  text: 'test2',
};

console.log(refucerCards(initialStateCard, action));

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
