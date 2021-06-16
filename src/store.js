
import thunk from 'redux-thunk';

import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import { questionLevelListReducer, questionListReducer, questionTypeListReducer } from './reducer/questionReducer';
import { usercoinUpdateReducer, userDetailsReducer, userlevcoinUpdateReducer, userRegisterReducer, userSigninReducer } from './reducer/userReducer';

const initialState ={
    userSignin:{
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },

}

const reducer = combineReducers({
    listQuestion: questionListReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    quizLevel:questionLevelListReducer,
    quizType:questionTypeListReducer,
    userDetails:userDetailsReducer,
    userCoin:usercoinUpdateReducer,
    userLevcoin:userlevcoinUpdateReducer,


});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;