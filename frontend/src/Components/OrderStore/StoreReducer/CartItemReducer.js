import { ITEM } from "../StoreTypes/StoreTypes";

const initialstate = [];

export const CartItemReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ITEM:
      return state;
    default:
      return state;
  }
};
