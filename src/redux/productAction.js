import { ADD_PRODUCT, ADD_CART } from './productActionTypes';

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const addCart = (cart_product) => {
  return {
    type: ADD_CART,
    payload: cart_product,
  };
};