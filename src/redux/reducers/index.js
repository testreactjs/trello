import { combineReducers } from 'redux';
import { listReducer } from './list-reducer';
import { cardReducer } from './card-reducer';
import { userReducer } from './user-reducer';

export const rootReducer = combineReducers({
  cards: cardReducer,
  lists: listReducer,
  users: userReducer,
});
