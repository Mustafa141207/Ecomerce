import React, { useContext, useState } from 'react';
import {Formik, useFormik} from'formik';
import * as Yup from'yup';
import axios from'axios'
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/UserToken';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

 export default function Login() {

 async function ForgetPassword(email){
  let{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
      email:email,
  })

  if(data.statusMsg=='success'){
    toast.success('Reset Code Sent To Email');
    gate('/Reset')
  }
 }
  let gate=useNavigate();
  let[Loading,SetLoading]=useState(false);
  let[Error,getError]=useState('');
let{Token,SetToken}=useContext(TokenContext);
  async function login(val){
  let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((error)=>{
    getError(error.response.data.message);
  });

  if(data.message=='success'){
    localStorage.setItem('UserToken',data.token);
   SetToken(data.token);
   SetLoading(true)
   gate('/home')
 
  }
  }
  let validationSchema=Yup.object({
 
    email:Yup.string().email('Email is invalid').required('Email is required'),
    
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'Password Must Start With Upper Case').required('password Is Required'),
  
    
  });
  
  let formik=useFormik({
    initialValues:{
      email:'',
      password:'',
   
    },
    validationSchema:validationSchema,
    onSubmit:login,
  });





  return (
  <>
  <Helmet>
<meta charSet="utf-8" />
<title>Login</title>
</Helmet>
  <div className="container  py-5  w-50">
    <h3 className='mainColor py-2'>Register Now</h3>
  <form onSubmit={formik.handleSubmit} >
        {/* mail */}
    <label htmlFor="email">Email</label>
    <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  className=' form-control' type='email' name='email' />
    {formik.errors.email&& formik.touched.email?<div className=' p-2 my-1 alert alert-danger'>{formik.errors.email}</div>:''}
      {/* mail */}
        {/* pass */}
    <label htmlFor="password">password</label>
    <input  onBlur={formik.handleBlur} onChange={formik.handleChange} type='password'  value={formik.values.password}  className=' form-control' name='password' />
    {formik.errors.password&& formik.touched.password?<div className=' p-2 my-1 alert alert-danger'>{formik.errors.password}</div>:''}
    {/* pass */}


    {Error!=null? <p>{Error}</p>:''}
    <button disabled={!(formik.isValid&& formik.dirty)} type=' submit' className=' btn bg-main text-white my-3'>Log in
    {Loading?<span> <i className='fa-solid fa-spinner text-light fa-spin ms-2'></i></span> :''}
    </button>
  </form>
  <button onClick={()=>{
    ForgetPassword(formik.values.email)
  }} className='btn border-0 p-0 m-0 '><p className='text-main fw-bold'>Forget Password</p></button>
  <p className='text-muted'> I Dont have a Acoount <Link className='text-main text-decoration-none fw-bolder' to='/reg'>SignUp</Link></p>
  

  </div>
 
  
  
  </>
  )
}

