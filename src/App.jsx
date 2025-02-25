import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"

import { login, logout } from './features/auth/authSlice';
function App() {

  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch

  useEffect(()=>{
    authService.getCurentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({user}))

      }
    })
    .finally(()=>setLoading(false))
  },[])

   return (
    <>
      <h1>A blog app with appwrite</h1>
    </>
  )
}

export default App
