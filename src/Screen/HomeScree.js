import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function HomeScreen(){
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    return(
        
            
            <div className="col-1">
                
                {
                    userInfo ? 
                    <div className="loadQuiz">
                        <Link to='/dashboard'>
                            Play Quiz As a
                        </Link>
                    </div>

                :
                    <span className="loadQuiz">
                            <div>
                                <Link to='/signin'>Sign In to play</Link>
                            </div>
                            <div>
                                <Link to="/guess/level=1">
                                    Play as a guess
                                </Link>
                            </div>
                        </span> 

                }
            
            </div>
            
        
    )
}