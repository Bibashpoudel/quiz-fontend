import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { questionTypeList } from '../action/question';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function CategoryScreen(){


    const dispatch = useDispatch();

    const quizType = useSelector((state) => state.quizType)
    const {loading, error, Types} = quizType;
    

    
    useEffect(()=>{
        dispatch(questionTypeList());
    },[dispatch,])
    
    return(
        <div className="content">
           
            {loading ? 
              <LoadingBox></LoadingBox>
             : error? 
              <MessageBox variant="danger">{error}</MessageBox>
             : 
              <ul>
                  <li>
                    <Link to="/level"> Play As Level</Link>
                  </li>
                  {
                      Types.map((type) => (
                        <Link to={`/user/type=${type}`}  >
                            <li key={type}>
                                {type}
                            </li>
                        </Link>
                      ))
                  }
              </ul>
            }
            
        </div>
    )
}