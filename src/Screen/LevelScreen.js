

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { questionLevelList, questionList } from '../action/question';
import { userDetail } from '../action/userAction';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';


export default function LevelScreen(props){
    const {
        level = 2,
        type = 'all',
        myLevel = 0

    } = useParams();

    const [userlevel, SetUserLevel] = useState();

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const {loading:userloading, error:usererror, user} = userDetails;

    const [clickLevel , SetClickLevel ] = useState();
    const listQuestion = useSelector((state) => state.listQuestion)
    const {loading, error, questions}= listQuestion;

    const quizLevel = useSelector(state => state.quizLevel)
    const {loading: loadingLevel, error:errorLevel, levels} = quizLevel;

    const checkUserLevel = (e) =>{
        
        const str = e.target.textContent;
        const words = str.slice(7, 8);
        // SetUserLevel(user.level)
        
        console.log(user.level)
        //to check weather user is eligable or not
        if(user.level >= words - 1 ){

            props.history.push(`/user/level=${words}`)
        }
        else{
            const incompleteLevel = user.level + 1;
            alert("first complete " + incompleteLevel )
        }
        // window.location.reload(true);
    }

    const dispatch = useDispatch()
    useEffect(()=>{
        // SetCurrentIndex(currentIndex + 1)
      
        dispatch(questionList({
            level : level !== 1 ? level : '',
            type: type !== 'all' ? type : '' 
        }));
        dispatch(questionLevelList())
        if(!user){
            dispatch(userDetail(userInfo._id));
           }
           else{
               
               SetUserLevel(user.level);
           }
    },[dispatch, level , type, user, userInfo._id])
    const getFilterUrl = (filter) =>{
        const filterLevel = filter.level || level
        const filterType = filter.type || type
 
        return `/level/${filterLevel}/type${filterType}`
    }
    return(
        <div className="level">
            {loadingLevel ? (
                        <LoadingBox></LoadingBox>
                    ) : errorLevel ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ):
                    (
                        levels.map((l)=>(
                            
                           <div onClick={e => checkUserLevel(e)}>
                                Level {' '}   
                                {l}
                           </div>
                            

                        ))
                        
                    )
                        
                    
                }
        </div>
    )
}