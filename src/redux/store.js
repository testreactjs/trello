import { createStore } from 'redux';
import { cardReducer, initialStateCards } from './reducers/card-reducer';

export default reducers => {
  return {};
};

export const store = createStore(cardReducer, initialStateCards);
