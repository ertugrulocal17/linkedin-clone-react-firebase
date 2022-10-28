import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser,login } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import Widgets from './Widgets';
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        // user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      }else{
        // user is logged out
        dispatch(logout());
      }
    })
  },[])
  return (
    <div className="app">
      {/* <h1>Let's build a LinkedIn Clone</h1> */}
      <Header />

      {!user ? (
        <Login /> 
        ) : (
      <div className='app__body'>
        <Sidebar />      
        <Feed />
        <Widgets />
      </div>

      )}

      {/* App Body */}
      

    </div>
  );
}

export default App;
