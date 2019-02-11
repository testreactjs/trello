import { handleActions } from 'redux-actions';
import { fakeComments } from './fake-data';

export const initialStateComments = fakeComments;
export const commentReducer = handleActions({}, initialStateComments);
