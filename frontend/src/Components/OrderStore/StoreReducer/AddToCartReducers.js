import {
  AddToCart,
  getItemToCart,
  RemoveItemToCart,
} from "../StoreAction/constants";

const initState = {
  data: "",
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  
  switch (action.type) {
    case AddToCart.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case AddToCart.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        loading: true,
        data: action.payload,
      };
      break;
    case AddToCart.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case getItemToCart.GETITEM_TO_CART_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case getItemToCart.GETITEM_TO_CART_SUCCESS:
      state = {
        ...state,
        loading: true,
        data: action.payload,
      };
      break;
    case getItemToCart.GETITEM_TO_CART_FAILURE:
      state = {
        ...state,
        loading: false,
        data : action.payload
      };
      break;
    case RemoveItemToCart.REMOVEITEM_TO_CART_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case RemoveItemToCart.REMOVEITEM_TO_CART_SUCCESS:
      state = {
        ...state,
        loading: true,
        data: action.payload,
      };
      break;
    case RemoveItemToCart.REMOVEITEM_TO_CART_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
