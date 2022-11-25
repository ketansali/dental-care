
import { addPatient,getPatient } from "../StoreAction/constants";
import Toast from "../../Toaster";
const initState = {
  data: "",
  loading: false,
  error: null
};

export default (state = initState, action) => {
  
  switch (action.type) {
    case addPatient.ADD_PATIENT_REQUEST:
      state = {
        ...state,
        loading:true
      };

    case addPatient.ADD_PATIENT_SUCCESS:
        Toast({ msg: action.payload.message, type: "success" });
      state = {
        ...state,
        loading:true,
        data :action.payload
      };

    case addPatient.ADD_PATIENT_FAILURE:
        Toast({ msg: action.payload.message, type: "error" });
      state = {
        ...state,
        loading:false
      };
    case getPatient.GET_PATIENT_REQUEST:
      state = {
        ...state,
        loading:true
      };

    case getPatient.GET_PATIENT_SUCCESS:
      state = {
        ...state,
        loading:true,
        data :action.payload
      };

    case getPatient.GET_PATIENT_FAILURE:
      state = {
        ...state,
        loading:false
      };
  }
  return state
};