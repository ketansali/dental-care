
import { addOrder,getOrder } from "../StoreAction/constants";

const initState = {
  data: "",
  loading: false,
  error: null
};

export default (state = initState, action) => {
  
  switch (action.type) {
    case addOrder.ADD_ORDER_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
    case addOrder.ADD_ORDER_SUCCESS:
      
        
      state = {
        ...state,
        loading:true,
        data :action.payload
      };
      break;
    case addOrder.ADD_ORDER_FAILURE:
    case getOrder.GET_ORDER_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
    case getOrder.GET_ORDER_SUCCESS:
      
        
      state = {
        ...state,
        loading:true,
        data :action.payload
      };
      break;
    case getOrder.GET_ORDER_FAILURE:
        
      state = {
        ...state,
        loading:false
      };
      break;
  }
  return state
};