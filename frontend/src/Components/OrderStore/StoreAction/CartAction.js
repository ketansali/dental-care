import { ADD_TO_CART, REMOVE_FROM_CART } from "../StoreTypes/StoreTypes";

export const cartItems = (id) => {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
};

export const removeCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
