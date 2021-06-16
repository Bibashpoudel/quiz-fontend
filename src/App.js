import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { signout, userDetail } from './action/userAction';


import './App.css';
import CategoryScreen from './Screen/CategoryScreen';
import GuessScreen from './Screen/Guessplayer';
import HomeScreen from './Screen/HomeScree';
import LevelScreen from './Screen/LevelScreen';
import QuizScreen from './Screen/quizScreen';
import RegisterPage from './Screen/RegisterPage';
import SiginInPage from './Screen/signinScreen';
import AddQuiz from './ScreenAdmin/AddQuestion';

function App(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
    const {  user } = userDetails;
    const [coin, SetCoin] = useState();
    const [level, SetLevel] = useState();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  

  const dispatch = useDispatch()

  const signoutHandaler = ()=>{
    dispatch(signout())

   

  }

  useEffect(()=>{
    // // if(!userInfo){
    // //   if(!user){
    // //     dispatch(userDetail(userInfo._id))
    // //   }else{
    // //     SetCoin(user.coin);
    // //     SetLevel(user.level);
    // //   }
    // // }
    // else{

    // }

  },[])
  return (
   <BrowserRouter>
      <div className="grid-container" >
        <header>
        <div className="main-header">
          <div className="logo">
            <Link to="/"> logo</Link>
          </div>
          <div className="header-link">
            <div className="header-left-link">
              {userInfo ? (
                  <span>
                   <span style={{color:'#ffffff'}}> My Coin{' '}</span>
                    <span className="badge">  {userInfo.coin}</span>
                    <span style={{color:'#ffffff'}}> Level {' '}</span>
                    <span className="badge">  {userInfo.level}</span>

                    <span className="dropdown">
                  <Link to="#">
                    {userInfo.name} {' '}
                    <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to='/profile' >Profile</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={signoutHandaler}>sign out</Link>
                    </li>
                    
                    
                  </ul>
                  
                </span>
                  </span>
                 
              ):
              (
                <span>
                  <Link to="/register">register</Link>
                  <Link to="/signin">Sign in</Link>
                </span>
              )
              }
              <span>
                {/* level {level} */}
              </span>
              {/* <Link to="/">About Us</Link> */}
            </div>
            <div className="hamburger"
              onClick={() => setSidebarIsOpen(true)}
            >
              <div className="one"></div>
              <div  className="one"></div>
              <div className="one"></div>
            </div>
          </div>


        </div>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <div className="side-logo">
          <Link to='/'> logo</Link>
          <div className="close-bottom"
            onClick={() => setSidebarIsOpen(false)}
            
            type="button"
          >
            x
          </div>
        <hr></hr>
        </div>
        <div className="header-aside-link">
          <Link to="/register">register</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/">About Us</Link>
         
        </div>

      </aside>
      <main className="main-content">
        <Route path="/level" component={LevelScreen}></Route>
        <Route path="/dashboard" component={CategoryScreen}></Route>
        <Route path='/add_Quiz' component={AddQuiz}></Route>
        <Route path="/guess/level=:level" component={GuessScreen}></Route>
        
        <Route path='/register' component={RegisterPage}></Route>
        <Route path='/signin' component={SiginInPage}></Route>
        <Route path="/user/level=:level"  component={QuizScreen}></Route>
        <Route path="/user/type=:type"  component={QuizScreen}></Route>
        <Route path="/level=:level"  component={QuizScreen}></Route>
        <Route path="/startquiz"  component={QuizScreen}></Route>
        <Route path="/" exact component={HomeScreen}></Route>
      </main>
      <footer>Footer section</footer>
	  </div>
   </BrowserRouter> 
  )
}

export default App;
