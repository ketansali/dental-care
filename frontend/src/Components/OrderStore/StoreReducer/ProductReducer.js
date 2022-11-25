
import { getAllProduct } from "../StoreAction/constants";
const initState = {
  data: "",
  loading: false,
  error: null
};

export const ProductsReducer = (state = initState, action) => {
  
  switch (action.type) {
    case getAllProduct.GETALL_PRODUCT_REQUEST:
      state = {
        ...state,
        loading:true
      };

    case getAllProduct.GETALL_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading:true,
        data :action.payload
      };

    case getAllProduct.GETALL_PRODUCT_FAILURE:
      state = {
        ...state,
        loading:false
      };
  }
  return state
};