

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuestion } from '../action/question';

import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';



function AddQuiz(props){

    const [question, SetQuestion] = useState(''); 
    const [option1, SetOption1] = useState(''); 
    const [option2, SetOption2] = useState(''); 
    const [option3, SetOption3] = useState(''); 
    const [option4, SetOption4] = useState(''); 
    const [answer, SetAnswer] = useState(''); 
    const [level, SetLevel] = useState(''); 

    const redirect = props.location.search ? props.location.search.split('=')[1]: '/'

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error} =userRegister;
    

    const dispatch = useDispatch();
    const addQuestionhandaler =(e)=>{
        e.preventDefault();
        dispatch(addQuestion(question, option1, option2, option3, option4, answer, level))
    }
    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect);
            
        }

    }, [props.history, redirect, userInfo]);


    return(
        <div>
            <form className="form" onSubmit={addQuestionhandaler}>
                <div>
                <h2> Add a Quiz</h2>
                </div>
                <div>
                    {
                            loading? <LoadingBox></LoadingBox>
                        :
                            error? <MessageBox variant="danger">{error}</MessageBox>
                        : " "    
                    }
                </div>
                <div className="">
                    <label htmlFor="question"> Question</label>
                    <input 
                        type="text" 
                        id="question" 
                        placeholder="question"
                        onChange={(e) => SetQuestion(e.target.value)}
                        
                    ></input>
                </div>
                <div className="">
                    <label htmlFor="option1">  First option</label>
                    <input 
                        type="text" 
                        id="option1" 
                        placeholder="option1"
                        onChange={(e) => SetOption1(e.target.value)}
                    
                    ></input>
                </div>
                <div>
                    <label htmlFor="option2"> second option</label>
                    <input 
                        type="text"
                        id="option2" 
                        placeholder="option2"
                        onChange={(e) => SetOption2(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="option3"> Third option</label>
                    <input 
                        type="text"
                        id="option3" 
                        placeholder="option3"
                        onChange={(e) => SetOption3(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="option4"> Fourth option</label>
                    <input 
                        type="text"
                        id="option4" 
                        placeholder="option4"
                        onChange={(e) => SetOption4(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="answer"> Answer</label>
                    <input 
                        type="text"
                        id="answer" 
                        placeholder="answer"
                        onChange={(e) => SetAnswer(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="level"> level</label>
                    <input 
                        type="number"
                        id="level" 
                        placeholder="level"
                        onChange={(e) => SetLevel(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button type="submit" className="primary">Add Question</button>
                </div>
                

            </form>
           
        </div>
    )

}

export default AddQuiz;