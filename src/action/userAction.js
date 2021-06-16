import axios from "axios";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_COIN_FAIL, USER_UPDATE_COIN_LEVEL_FAIL, USER_UPDATE_COIN_LEVEL_REQUEST, USER_UPDATE_COIN_LEVEL_SUCCESS, USER_UPDATE_COIN_REQUEST, USER_UPDATE_COIN_SUCCESS } from "../constrains/userConstrain";




export const Signup = (name, email, password) => async( dispatch) =>{
    dispatch({
        type:USER_REGISTER_REQUEST,
        payload: {name, email, password}
    });
    try {
        const {data} = await axios.post('/api/user/register', {name, email, password})
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        
    }
}
export const Signin = (email, password) => async(dispatch) =>{
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload:{email, password}
    })
    try {
        const {data} = await axios.post('/api/user/signin', {email, password})
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data
        });
        
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })   
    }
}
export const signout = () => (dispatch)=>{
    localStorage.removeItem('userInfo');
    
    dispatch({
        type:USER_SIGNOUT,
    });
}

export const userDetail = (userid) => async(dispatch, getState) =>{
    dispatch({
        type:USER_DETAILS_REQUEST,
        
    })
    const {
        userSignin:{userInfo},
    } = getState();
    try {
        const {data} = await axios.get(`/api/user/${userid}`, {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })

        
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        }) 
    }
}

export const updateUserLevelCoin = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_COIN_LEVEL_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(`/api/user/levcoin`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_UPDATE_COIN_LEVEL_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_COIN_LEVEL_FAIL, payload: message });
    }
  };
  export const updateUserCoin = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_COIN_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(`/api/user/coin`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_UPDATE_COIN_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_COIN_FAIL, payload: message });
    }
  };