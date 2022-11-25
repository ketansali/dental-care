import { AddToCart,getItemToCart,RemoveItemToCart } from "../StoreAction/constants";
import axios from "../../../helpers/axios";
import Toast from "../../Toaster";
export const addTocart = (item) => {
  return async (dispatch) => {
    dispatch({ type: AddToCart.ADD_TO_CART_REQUEST });
    
    const res = await axios.post("/cart/addItemToCart", item);
    if (res.data.isSuccess) {
      dispatch({ type: AddToCart.ADD_TO_CART_SUCCESS, payload: res.data });
      Toast({ msg: res.data.message, type: "success" });
    } else {
      dispatch({ type: AddToCart.ADD_TO_CART_FAILURE, payload: res.data });
      Toast({ msg: res.data.message, type: "error" });
    }
  }
}

export const getItemTocart = () => {
    return async (dispatch) => {
      
      dispatch({ type: getItemToCart.GETITEM_TO_CART_REQUEST });
      const res = await axios.get("/cart/getCartItem");
      if (res.data.isSuccess) {
        dispatch({ type: getItemToCart.GETITEM_TO_CART_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: getItemToCart.GETITEM_TO_CART_FAILURE, payload: res.data });
      }
    }
  }

  export const removeTocart = (productId) => {
    return async (dispatch) => {
      dispatch({ type: RemoveItemToCart.REMOVEITEM_TO_CART_REQUEST });
      const res = await axios.post(`/cart/removeCartItem/${productId}`);
      if (res.data.isSuccess) {
        dispatch({ type: RemoveItemToCart.REMOVEITEM_TO_CART_SUCCESS, payload: res.data });
        Toast({ msg: res.data.message, type: "success" });
      } else {
        dispatch({ type: RemoveItemToCart.REMOVEITEM_TO_CART_FAILURE, payload: res.data });
        Toast({ msg: res.data.message, type: "error" });
      }
    }
  }
