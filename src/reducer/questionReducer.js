import { QUESTION_ADD_FAIL, QUESTION_ADD_REQUEST, QUESTION_ADD_SUCCESS, QUESTION_LEVEL_LIST_FAIL, QUESTION_LEVEL_LIST_REQUEST, QUESTION_LEVEL_LIST_SUCCESS, QUESTION_LIST_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS, QUESTION_TYPE_LIST_FAIL, QUESTION_TYPE_LIST_REQUEST, QUESTION_TYPE_LIST_SUCCESS } from "../constrains/QuestionConstrain";



export const questionListReducer = (state ={ questions:[]}, action) =>{
    switch(action.type){
        case QUESTION_LIST_REQUEST:
            return{
                loading:true,
            }
        case QUESTION_LIST_SUCCESS:
            return{
                loading:false,
                questions:action.payload
            }    
        case QUESTION_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }    
        default:
            return state;    
    }
}
export const questionLevelListReducer = (state ={loading:true, questions:[]}, action) =>{
    switch(action.type){
        case QUESTION_LEVEL_LIST_REQUEST:
            return{
                loading:true,
            }
        case QUESTION_LEVEL_LIST_SUCCESS:
            return{
                loading:false,
                levels:action.payload
            }    
        case QUESTION_LEVEL_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }    
        default:
            return state;    
    }
}
export const questionTypeListReducer = (state ={ loading:true, questions:[] }, action) =>{
    switch(action.type){
        case QUESTION_TYPE_LIST_REQUEST:
            return{
                loading:true,
            }
        case QUESTION_TYPE_LIST_SUCCESS:
            return{
                loading:false,
                Types:action.payload
            }    
        case QUESTION_TYPE_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }    
        default:
            return state;    
    }
}
export const addQuestionReducer = (state={}, action) =>{
    switch(action.type){
        case QUESTION_ADD_REQUEST:
            return{
                loading:true
            }
        case QUESTION_ADD_SUCCESS:
            return {
                loading:false,
                question:action.payload
            }
        case QUESTION_ADD_FAIL:
            return{
                loading:false,
                error:action.payload
            }  
        
        default:
            return state   
        
    }
}