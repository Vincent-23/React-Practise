// reducers/index.js
import { combineReducers } from 'redux';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  product: productReducer,
  // Add other reducers here if needed
});

export default rootReducer;
