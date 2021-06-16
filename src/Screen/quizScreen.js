import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {questionList} from '../action/question'
import { updateUserCoin, updateUserLevelCoin, userDetail } from '../action/userAction';
import LoadingBox from '../component/LoadingBox.js'
import MessageBox from '../component/MessageBox.js'
import { USER_UPDATE_COIN_LEVEL_RESET, USER_UPDATE_COIN_RESET } from '../constrains/userConstrain';


function QuizScreen(props){

    

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
    const [entryFee, SetEntryFee] = useState();
    
    //get question details
    const listQuestion = useSelector((state) => state.listQuestion)
    const {loading, error, questions}= listQuestion;

    //get user details
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading:loadingUser, error:errorUser, user } = userDetails;

    const [userlevel, SetUserLevel] = useState();
    const [coin, SetCoin] = useState();
    const [updatecoin , SetUpdateCoin] = useState();

    //get quil level details
    const quizLevel = useSelector(state => state.quizLevel)
    const {loading: loadingLevel, error:errorLevel, levels} = quizLevel;

    //this is to grab the user state of level or type to deduce the coin and to increase the coin
    const quiztype = props.location.search  ? String(props.location.search.split('=')[1]):type;
    
    const userquizLevel = props.location.search  ? Number(props.location.search.split('=')[1]):level;
    

    
    const dispatch = useDispatch()
   
   
    useEffect(()=>{
        // SetCurrentIndex(currentIndex + 1)
      
        dispatch(questionList({
            level : level !== 1 ? level : '',
            type: type !== 'all' ? type : '' 
        }));
       if(!user){
            dispatch({type:USER_UPDATE_COIN_LEVEL_RESET})
            dispatch({type:USER_UPDATE_COIN_RESET})
            dispatch(userDetail(userInfo._id));
       }
       else{
           SetCoin(user.coin);
           SetUserLevel(user.level);
       }

    },[dispatch, level , type, userInfo._id, user])


    const getFilterUrl = (filter) =>{
        const filterLevel = filter.level || level
        const filterType = filter.type || type
 
        return `/level=${filterLevel}/type=${filterType}`
    }
     const submithandaler = (e)=>{
         // e.preventDefault()
         console.log(coin)
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
     const startQuiz=()=>{
 
         SetUserLevel(userquizLevel);
         if (userquizLevel >= 1 && userquizLevel <= 5 ){
            SetEntryFee(10);
            SetUpdateCoin(user.coin - 10);
            const newCoin = user.coin -10
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
             
         }
        if (userquizLevel >= 6 && userquizLevel <= 10 ){
            SetEntryFee(20)
            SetCoin(user.coin - 20)
            SetUpdateCoin(user.coin - 20);
            const newCoin = user.coin - 20;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
            
            
        }
        if (userquizLevel >= 11 && userquizLevel <= 15 ){
            SetEntryFee(30)
            SetCoin(user.coin -30)
            SetUpdateCoin(user.coin - 30);
            const newCoin = user.coin - 30;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
            
        }
        if (userquizLevel >= 16 && userquizLevel <=20 ){
            SetEntryFee(40)
            SetCoin(user.coin - 40)
            SetUpdateCoin(user.coin - 40);
            const newCoin = user.coin - 40;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
           
        }
        if (userquizLevel >= 21 && userquizLevel <= 25 ){
            SetEntryFee(50)
            SetCoin(user.coin - 50)
            SetUpdateCoin(user.coin - 50);
            const newCoin = user.coin - 50;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
        
        }

        if (userquizLevel  >= 26 && userquizLevel <= 30 ){
            SetEntryFee(60)
            SetCoin(user.coin - 60)
            SetUpdateCoin(user.coin - 60);
            const newCoin = user.coin - 60;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
            
        }
        if (userquizLevel  >= 31 && userquizLevel <= 35 ){
            SetEntryFee(70)
            SetCoin(user.coin - 70)
            const newCoin = user.coin - 70;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
            
        }
        if (userquizLevel  >= 36 && userquizLevel <= 40 ){
            SetEntryFee(80)
           SetCoin(user.coin - 80)
           SetUpdateCoin(user.coin - 80);
            const newCoin = user.coin - 80;

            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
           
        }
        if (userquizLevel  >= 41 && userquizLevel <= 45 ){
            SetEntryFee(90)
            SetCoin(user.coin - 90)
            SetUpdateCoin(user.coin - 90);
            const newCoin = user.coin - 90;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
            
        }
        if (userquizLevel  >= 46 && userquizLevel <= 50 ){
            SetEntryFee(100)
            SetCoin(user.coin - 90)
            SetUpdateCoin(user.coin - 100);
            const newCoin = user.coin - 100;
            dispatch(updateUserCoin({userId:user._id, coin:newCoin}))
           
        }
        
        

         setDisplay(true)
        
         SetLength(questions.length)
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

         console.log(user.coin)
         
         if(usernAnswer === answer){
             // console.log(  score + 1 )
             SetScore(score + 1)
            
             SetCurrentIndex(currentIndex +1)
             const addscore = score + 1; 
             const wnCoin = (addscore  * entryFee + 0.05 * userlevel ) * 0.7;
         
            const newCoin = updatecoin + wnCoin;
            const finalroundcoin = Math.ceil(newCoin)
            console.log(finalroundcoin);
            //update user level of same level if less then userlevel
            if(user.level > userquizLevel){
                dispatch(updateUserLevelCoin({userId:user._id, coin:finalroundcoin, level:user.level, }))
            }
            else{
                dispatch(updateUserLevelCoin({userId:user._id, coin:finalroundcoin, level:userlevel, }))   
            }
         }
         else{
            const addscore = score;
            const wnCoin = (addscore  * entryFee + 0.05 * userlevel ) * 0.7;
         
            const newCoin = updatecoin + wnCoin;
            console.log(newCoin);
            const finalroundcoin = Math.ceil(newCoin)
            console.log(finalroundcoin);
            // dispatch(updateUserLevelCoin({userId:user._id, coin:newCoin, level:userlevel, }))
            if(user.level > userquizLevel){
                dispatch(updateUserLevelCoin({userId:user._id, coin:finalroundcoin, level:user.level, }))
            }
            else{
                dispatch(updateUserLevelCoin({userId:user._id, coin:finalroundcoin, level:userlevel, }))   
            }
         }
         SetCurrentIndex(1);
         SetMyLevel(mylevel + 1);
         console.log(" firsthappy " + score)
         //this is to set user level
         
 
         console.log("level " + userlevel)
         console.log(entryFee)
         
 
        //  const wnCoin = (addscore  * entryFee + 0.05 * userlevel ) * 0.7;
         
        //  const newCoin = coin - entryFee +wnCoin;
        //  console.log(newCoin);

         //dispatch(updateUserLevelCoin({userId:user._id, coin:newCoin, level:userlevel, }))
         
     }
     const nextLevel = ()=>{
         props.history.push(`/signin?redirect=level/${mylevel}`)
         SetCurrentIndex(1);
         SetQuizEnd(false)
         // console.log("current index" + currentIndex)
        // window.location.reload(true);
        //  // console.log('load second level') 
        //  SetLength(questions.length)
        //  console.log( questions.length)
        //  SetQuestion(questions[currentIndex].question)
        //  SetOptions1(questions[currentIndex].option1)
        //  SetOptions2(questions[currentIndex].option2)
        //  SetOptions3(questions[currentIndex].option3)
        //  SetOptions4(questions[currentIndex].option4)
        //  SetAnswer(questions[currentIndex].answer)
        //  // SetCurrentIndex(currentIndex + 1)
        //  console.log(levels) 
        //  document.querySelector('#ans1').checked = false;
        //  document.querySelector('#ans2').checked = false
        //  document.querySelector('#ans3').checked = false
        //  document.querySelector('#ans4').checked = false
         
     }
    
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

export default QuizScreen;