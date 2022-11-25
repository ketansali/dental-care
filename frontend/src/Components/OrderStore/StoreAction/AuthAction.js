import {userContants,authConstants} from './constants'
import axios from '../../../helpers/axios'

export const signup = (user)=>{
    return async (dispatch)=>{
        dispatch({type:userContants.USER_REGISTER_REQUEST})
        const res = await axios.post('/account/register',user)
        if(res.data.isSuccess){
            dispatch({type:userContants.USER_REGISTER_SUCCESS,payload:res.data})
        }else{
            dispatch({type:userContants.USER_REGISTER_FAILURE,payload:res.data})
        }
    }
}
export const login = (user)=>{
    return async (dispatch)=>{
        dispatch({type:authConstants.LOGIN_REQUEST})
        const res = await axios.post('/account/login',user)
        if(res.data.isSuccess){
            localStorage.setItem("token", res.data.token);
            dispatch({type:authConstants.LOGIN_SUCCESS,payload:res.data})
        }else{
            dispatch({type:authConstants.LOGIN_FAILURE,payload:res.data})
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:  token
                
            });
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post(`/admin/signout`);

        if(res.status === 200){
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }

        
    }
}