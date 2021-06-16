import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {questionList} from '../action/question'
import { userDetails } from '../action/userAction';
import LoadingBox from '../component/LoadingBox.js'
import MessageBox from '../component/MessageBox.js'


function GuessScreen(props){

    

    const {
        level = 1,
        type = 'all'

    } = useParams();
    const [usernAnswer, SetUserAnswer] = useState(null);
    const [question, SetQuestion] = useState([]);
    const [ currentIndex, SetCurrentIndex] = useState(0);
    const [options1, SetOptions1] = useState(null);
    const [options2, SetOptions2] = useState(null);
    const [options3, SetOptions3] = useState(null);
    const [options4, SetOptions4] = useState(null);
    const [quizEnd, SetQuizEnd] = useState(false);
    const [score, SetScore] = useState(0);
    const[disable, setDisable] = useState(true);
    const [answer, SetAnswer] = useState(null);
    const [length, SetLength] = useState();
    const [mylevel, SetMyLevel] = useState(1);
    
    //get question details
    const listQuestion = useSelector((state) => state.listQuestion)
    const {loading, error, questions}= listQuestion;

    //get user details
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    //get quil level details
    const quizLevel = useSelector(state => state.quizLevel)
    const {loading: loadingLevel, error:errorLevel, levels} = quizLevel;

    //this is to grab the user state of level or type to deduce the coin and to increase the coin
    const quiztype = props.location.search  ? String(props.location.search.split('=')[1]):type;
    
    const userquizLevel = props.location.search  ? Number(props.location.search.split('=')[1]):level;
    

    
    const dispatch = useDispatch()
   
   const getFilterUrl = (filter) =>{
       const filterLevel = filter.level || level
       const filterType = filter.type || type

       return `/level=${filterLevel}/type=${filterType}`
   }
    const submithandaler = (e)=>{
        // e.preventDefault()
        if(usernAnswer === answer){
            console.log(  score + 1 )
            SetScore(score+1)
            // console.log("answer match")
        }
        else{
            // console.log(" answer not match"+ score)
        }
        SetLength(questions.length )
        SetCurrentIndex(currentIndex + 1)
        SetQuestion(questions[currentIndex].question)
        SetOptions1(questions[currentIndex].option1)
        SetOptions2(questions[currentIndex].option2)
        SetOptions3(questions[currentIndex].option3)
        SetOptions4(questions[currentIndex].option4)
        SetAnswer(questions[currentIndex].answer)


        document.querySelector('#ans1').checked = false;
        document.querySelector('#ans2').checked = false
        document.querySelector('#ans3').checked = false
        document.querySelector('#ans4').checked = false
    }

    const [display, setDisplay] = useState(false);
    const startQuiz=(error)=>{

        if (userquizLevel === '1' || '2' || '3' || '4' || '5' ){
            console.log(" final happy")
        }
        setDisplay(true)
        // console.log('load quiz') 
        SetLength(questions.length)
        console.log( questions.length)
        SetQuestion(questions[currentIndex].question)
        SetOptions1(questions[currentIndex].option1)
        SetOptions2(questions[currentIndex].option2)
        SetOptions3(questions[currentIndex].option3)
        SetOptions4(questions[currentIndex].option4)
        SetAnswer(questions[currentIndex].answer)
        SetCurrentIndex(currentIndex + 1)
        // console.log(levels)

    }
    const finishHandaler =()=>{
        setDisable(false)
        SetQuizEnd(true);
        if(usernAnswer === answer){
            // console.log(  score + 1 )
            SetScore(score+1)
            // console.log("answer match")
            SetCurrentIndex(currentIndex +1)
        }
        else{
            // console.log(" answer not match"+ score)
        }
        SetCurrentIndex(1);
        SetMyLevel(mylevel + 1);
        console.log(" firsthappy")
        console.log("level " + userquizLevel)

        if (userquizLevel === '1' || '2' || '3' || '4' || '5' ){
            console.log(" final happy")
        }
        
    }
    const nextLevel = ()=>{
        props.history.push(`/signin?redirect=level/${mylevel }`)
        SetCurrentIndex(1);
        SetQuizEnd(false)
        // console.log("current index" + currentIndex)
        
        // console.log('load second level') 
        SetLength(questions.length)
        console.log( questions.length)
        SetQuestion(questions[currentIndex].question)
        SetOptions1(questions[currentIndex].option1)
        SetOptions2(questions[currentIndex].option2)
        SetOptions3(questions[currentIndex].option3)
        SetOptions4(questions[currentIndex].option4)
        SetAnswer(questions[currentIndex].answer)
        // SetCurrentIndex(currentIndex + 1)
        console.log(levels) 
        document.querySelector('#ans1').checked = false;
        document.querySelector('#ans2').checked = false
        document.querySelector('#ans3').checked = false
        document.querySelector('#ans4').checked = false
        
    }



    useEffect(()=>{
        // SetCurrentIndex(currentIndex + 1)
      
        
        
        
            dispatch(questionList({
                level : level !== 1 ? level : '',
                type: type !== 'all' ? type : '' 
            }));

        

    },[dispatch, level , type])

    
    return(
        <div className={display === true ? '': 'loadquiz-1'} >
            
                    <div className={display === true ? 'endbutton': ' '} style={{marginTop:'50%'}}>
                        
                        <div onClick={startQuiz} className="loadQuiz" style={{cursor:'pointer', }}>
                            start
                        </div>
                    </div>
            <div className="inner-content" >
            <div className={ display === true ? 'startQuiz': ' bibash'}  >
                
                    <div className={ quizEnd === true ? 'endQuiz': 'information'}>
                        <p>{currentIndex + ' '} of {length}</p>
                        <p>2.2 min left</p>
                    </div>
                        <ul  >
                            <div className={ quizEnd === true ? 'endQuiz': ''}>
                                <h2 className="question header"> {question}</h2>
                                <div className="option-answer"> 
                                    <div className="first-option">
                                        <li>
                                    
                                            <input type="radio" name="answer" id="ans1"
                                                value={options1}
                                                onChange={(e) => SetUserAnswer(e.target.value)}
                                            
                                            /> <i></i>
                                            <label htmlFor="ans1" id="option1"> {options1}</label>
                                        </li>
                                        <li>
                                        
                                            <input type="radio" name="answer" id="ans2"
                                                value={options2}
                                                onChange={(e) => SetUserAnswer(e.target.value)} 
                                                
                                            /><i></i>
                                        <label htmlFor="ans2" id="option2"> {options2}</label>
                                        </li>
                                    </div>
                                    <div className="second-option">
                                        <li>
                                            <input type="radio" name="answer" id="ans3"
                                                value={options3}
                                                onChange={(e) => SetUserAnswer(e.target.value)}
                                                
                                            /><i></i>
                                        <label htmlFor="ans3" id="option3">  {options3}</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="answer" id="ans4"
                                                value={options4}
                                                onChange={(e) => SetUserAnswer(e.target.value)}
                                        
                                            /><i></i>
                                        <label htmlFor="ans4" id="option4"> {options4}</label>
                                        </li>
                                    </div>
                                </div>    
                            </div>
                            <div>
                                <li>
                                    <label/>
                                    {
                                       currentIndex < length  &&
                                        
                                            <span id="submit" className={ quizEnd === true ? 'endQuiz': ''}>
                                                <button className="button primary " type="submit" onClick={submithandaler} >Submit</button>
                                            </span>
                                         
                                    }
                                       {     currentIndex === length &&
                                            <button className="button " onClick={finishHandaler} > Finish</button>
                                       }  
                                        {  score === length ||  score < 0  ||score >= 0  ?
                                            <div className={ disable === true ? 'buttonhide': 'buttonshow'} >
                                                <div>
                                                    <div style={{marginBottom:'2rem'}} > You have score {score } out of {length}</div>
                                                    
                                                    <button className="button" onClick={nextLevel} >
                                                        Next level
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <div >
                                                {/* <div style={{marginBottom:'2rem'}} > You have score {score } out of {length}</div>
                                                
                                                <button className="button" onClick={nextLevel} >
                                                    Next level
                                                </button> */}
                                                
                                            </div> 
                                    }
                 
                                   
                                    
                                </li>
                            </div>
                        </ul>   
                    
                </div>
            </div>
            
        </div>
    )
}

export default GuessScreen;