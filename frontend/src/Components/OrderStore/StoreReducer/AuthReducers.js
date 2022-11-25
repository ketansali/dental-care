import { userContants, authConstants } from "../StoreAction/constants";
import Toast from "../../Toaster";
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userContants.USER_REGISTER_SUCCESS:
      Toast({ msg: action.payload.message, type: "success" });
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userContants.USER_REGISTER_FAILURE:
      Toast({ msg: action.payload.message, type: "error" });
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      Toast({ msg: action.payload.message, type: "success" });
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        token: action.payload.token || localStorage.getItem('token'),
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      Toast({ msg: action.payload.message, type: "error" });
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
