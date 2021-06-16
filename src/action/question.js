import axios from 'axios'

import { QUESTION_LEVEL_LIST_FAIL, QUESTION_LEVEL_LIST_REQUEST, QUESTION_LEVEL_LIST_SUCCESS, QUESTION_LIST_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS , QUESTION_ADD_REQUEST,QUESTION_ADD_FAIL, QUESTION_ADD_SUCCESS,QUESTION_TYPE_LIST_REQUEST,QUESTION_TYPE_LIST_SUCCESS,QUESTION_TYPE_LIST_FAIL} from "../constrains/QuestionConstrain"

export const questionList =({level= '', type='',}) => async(dispatch)=>{

    dispatch({
        type:QUESTION_LIST_REQUEST,
        payload:{}
    })
    try {
        const {data} = await axios.get(`/api/quiz/question?level=${level}&type=${type}`)
        dispatch({
            type:QUESTION_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:QUESTION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}
export const questionLevelList =() => async(dispatch)=>{

    dispatch({
        type:QUESTION_LEVEL_LIST_REQUEST,
        payload:{}
    })
    try {
        const {data} = await axios.get(`/api/quiz/level`)
        dispatch({
            type:QUESTION_LEVEL_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:QUESTION_LEVEL_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}

export const questionTypeList =() => async(dispatch)=>{

    dispatch({
        type:QUESTION_TYPE_LIST_REQUEST,
        payload:{}
    })
    try {
        const {data} = await axios.get(`/api/quiz/type`)
        dispatch({
            type:QUESTION_TYPE_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:QUESTION_TYPE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}

export const addQuestion=(question, option1,option2, option3, option4, answer, level, type) => async(dispatch, getState)=>{
    
    try {
        dispatch({
            type:QUESTION_ADD_REQUEST,
            payload:{
                question, option1,option2, option3, option4, answer, level, type
            }
    
        })
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.post('/api/quiz/add_question',{question, option1,option2, option3, option4, answer, level, type},{
            headers:{
                'Authorization': 'Bearer ' + userInfo.token 
            }
        })
        
        dispatch({
            type:QUESTION_ADD_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:QUESTION_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}