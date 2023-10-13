// reducers/productReducer.js
import { ADD_PRODUCT, ADD_CART } from '../productActionTypes';

const initialState = {
  products: [],
  cartProduct: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ADD_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

export default productReducer;
