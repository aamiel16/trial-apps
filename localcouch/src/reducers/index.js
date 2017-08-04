import { combineReducers } from 'redux';

import { documentsReducer } from './documentsReducers';

const rootReducer = combineReducers({
  documents: documentsReducer
});

export default rootReducer;
