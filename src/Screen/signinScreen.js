import React, { useEffect, useState } from 'react'

import {  Link, } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Signin } from '../action/userAction';
import LoadingBox from '../component/LoadingBox.js';
import MessageBox from '../component/MessageBox';

import '../stylesheet/signin.css'


function SiginInPage(props){

    const [email, SetEmail] = useState(''); 
    const [password, SetPassword] = useState(''); 

    const redirect = props.location.search ? props.location.search.split('=')[1]: '/'

    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} =userSignin;

    const dispatch = useDispatch();


    const SigninHandaler = (e)=>{
        e.preventDefault();
        dispatch(Signin(email, password))
    }
    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect);
        }

    }, [props.history, redirect, userInfo]);

    return(
        <div className="signin-screen" >
            



            <form className="formSignin" onSubmit={SigninHandaler}>
                <div>
                <h2> Sign In</h2>
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
                    <label htmlFor="email"> Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="email"
                        onChange={(e) => SetEmail(e.target.value)}
                    
                    ></input>
                </div>
                <div>
                    <label htmlFor="Password"> Password</label>
                    <input 
                        type="password"
                        id="password" 
                        placeholder="password"
                        onChange={(e) => SetPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button type="submit" className=" button primary">Sign In</button>
                </div>
                <div>
                    <span>
                    New Customer? { ' '}
                    <Link to={`/register?redirect=${redirect}`} style={{ color:"blue"}}>
                          Create A account
                    </Link> 
                    </span>
                </div>

            </form>
           
        </div>
    )
}
export default SiginInPage;