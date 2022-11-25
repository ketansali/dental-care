import { ITEM } from "../StoreTypes/StoreTypes";

export const orderData = (id) => {
  return {
    type: ITEM,
    payload: id,
  };
};
