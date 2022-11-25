import { addAddress,getAddress } from "../StoreAction/constants";
import axios from "../../../helpers/axios";
import Toast from "../../Toaster";
export const addAddres = (address) => {
  return async (dispatch) => {
    dispatch({ type: addAddress.ADD_ADDRESS_REQUEST });

    const res = await axios.post("/address/add", address);
    if (res.data.isSuccess) {
      dispatch({ type: addAddress.ADD_ADDRESS_SUCCESS, payload: res.data });
      Toast({ msg: res.data.message, type: "success" });
    } else {
      dispatch({ type: addAddress.ADD_ADDRESS_FAILURE, payload: res.data });
      Toast({ msg: res.data.message, type: "error" });
    }
  };
};
export const GetAddress = () => {
  return async (dispatch) => {
    dispatch({ type: getAddress.GET_ADDRESS_REQUEST });
    const res = await axios.get("/address/get");
    if (res.data.isSuccess) {
      dispatch({ type: getAddress.GET_ADDRESS_SUCCESS, payload: res.data });
      Toast({ msg: res.data.message, type: "success" });
    } else {
      dispatch({ type: getAddress.GET_ADDRESS_FAILURE, payload: res.data });
      Toast({ msg: res.data.message, type: "error" });
    }
  };
};
