import {addPatient,getPatient} from '../StoreAction/constants'
import axios from '../../../helpers/axios'
export const addPatients = (form) => {
    return async (dispatch) => {
        dispatch({ type: addPatient.ADD_PATIENT_REQUEST });
        
    const res = await axios.post("/patient/add",form);
    if (res.data.isSuccess) {
      dispatch({ type: addPatient.ADD_PATIENT_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: addPatient.ADD_PATIENT_FAILURE, payload: res.data });
    }
  };
};
export const getPatients = () => {
    return async (dispatch) => {
        dispatch({ type: getPatient.GET_PATIENT_REQUEST });
        
    const res = await axios.get("/patient/get");
    if (res.data.isSuccess) {
      dispatch({ type: getPatient.GET_PATIENT_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: getPatient.GET_PATIENT_FAILURE, payload: res.data });
    }
  };
};
