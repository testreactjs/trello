import { createStore } from 'redux';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer);

// const unsubscribe = store.subscribe(() => console.log('Change store', store.getState()));
