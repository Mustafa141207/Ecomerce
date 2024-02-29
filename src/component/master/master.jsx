import React, { useContext, useEffect } from 'react'
import Navbar from '../navbar/navbar'
import { Outlet } from 'react-router-dom'
import { TokenContext } from '../../Context/UserToken'
import {Helmet} from "react-helmet";
import { Offline, Online } from "react-detect-offline";
import toast from 'react-hot-toast';







export default function Master() {
let{SetToken}=  useContext(TokenContext);
useEffect(()=>{
if(localStorage.getItem('UserToken')!=null){
  SetToken(localStorage.getItem('UserToken'))
}
},[])

  return (<>
   <Navbar/>
   <div className="container py-5">
   <Outlet/>
   </div>
   <div className='NetWork'>
    <Offline> <i className='fas fa-wifi'></i>You are Offline </Offline>
  </div>
  </>
  
       
 
  )
}
