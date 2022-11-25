
import { addAddress,getAddress } from "../StoreAction/constants";

const initState = {
  data: "",
  loading: false,
  error: null
};

export default (state = initState, action) => {
  
  switch (action.type) {
    case addAddress.ADD_ADDRESS_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
    case addAddress.ADD_ADDRESS_SUCCESS:
      
        
      state = {
        ...state,
        loading:true,
        data :action.payload
      };
      break;
    case addAddress.ADD_ADDRESS_FAILURE:
        
      state = {
        ...state,
        loading:false
      };
      break;
    case getAddress.GET_ADDRESS_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
    case getAddress.GET_ADDRESS_SUCCESS:
      
        
      state = {
        ...state,
        loading:true,
        data :action.payload
      };
      break;
    case getAddress.GET_ADDRESS_FAILURE:
        
      state = {
        ...state,
        loading:false
      };
      break;
  }
  return state
};