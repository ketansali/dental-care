import { addOrder,getOrder } from "../StoreAction/constants";
import axios from "../../../helpers/axios";
import Toast from "../../Toaster";
export const AddOrder = (order) => {
  return async (dispatch) => {
    
    dispatch({ type: addOrder.ADD_ORDER_REQUEST });
    
    const res = await axios.post("/order/add", order);
    if (res.data.isSuccess) {
      dispatch({ type: addOrder.ADD_ORDER_SUCCESS, payload: res.data });
    //   Toast({ msg: res.data.message, type: "success" });
    } else {
      dispatch({ type: addOrder.ADD_ORDER_FAILURE, payload: res.data });
    //   Toast({ msg: res.data.message, type: "error" });
    }
  }
};
export const GetOrder = (order) => {
  return async (dispatch) => {
    
    dispatch({ type: getOrder.GET_ORDER_REQUEST });

    const res = await axios.get("/order/get-order-by-id", order);
    if (res.data.isSuccess) {
      dispatch({ type: getOrder.GET_ORDER_SUCCESS, payload: res.data });
    //   Toast({ msg: res.data.message, type: "success" });
    } else {
      dispatch({ type: getOrder.GET_ORDER_FAILURE, payload: res.data });
    //   Toast({ msg: res.data.message, type: "error" });
    }
  };
};
