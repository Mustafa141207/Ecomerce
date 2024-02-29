import React, { useContext, useState } from 'react';
import {Formik, useFormik} from'formik';
import * as Yup from'yup';
import axios from'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Register() {
  let gate=useNavigate();

  let[Loading,SetLoading]=useState(false);
  let[Error,getError]=useState('');
 async function Submit(value){
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value).catch((error)=>{
getError(error.response.data.message);
    });
    SetLoading(true);
    if(data.message=='success'){
      gate('/login')
    }
   
  };
  
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema=Yup.object({
    name:Yup.string().min(3,'Min length is 3').max(10,"Max length is 10").required('name is Required'),
    email:Yup.string().email('Email is invalid').required('Email is required'),
    phone:Yup.string().matches(phoneRegExp,'Phone Is Invalid').required('Phone is Required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'Password Must Start With Upper Case').required('password Is Required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'Password Not Match').required('Repassword Is Required'),
  });
  let Formik=useFormik({
    initialValues:{
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":"",
    },
    validationSchema:validationSchema,
    onSubmit:Submit
 
  })
  return (
    <>
   
<Helmet>
<meta charSet="utf-8" />
<title>Register</title>
</Helmet>
    <div className="container  py-5  w-50">
      <h3 className='mainColor py-2'>Register Now</h3>
    <form onSubmit={Formik.handleSubmit} >
      {/* Name */}
      <label htmlFor="name">Enter Your Name</label>
   <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.name} className='form-control'name='name' />
   {Formik.errors.name&& Formik.touched.name?<div className=' alert alert-danger'>{Formik.errors.name}</div>:''}
       {/* Name */}
       {/* phone */}
      <label htmlFor="phone">Phone</label>
      <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.phone} type=' tel' className=' form-control' name='phone' />
      {Formik.errors.phone&& Formik.touched.phone?<div className=' alert alert-danger'>{Formik.errors.phone}</div>:''}
        {/* phone */}
          {/* mail */}
      <label htmlFor="email">Email</label>
      <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.email}  className=' form-control' type='email' name='email' />
      {Formik.errors.email&& Formik.touched.email?<div className=' alert alert-danger'>{Formik.errors.email}</div>:''}
        {/* mail */}
          {/* pass */}
      <label htmlFor="password">password</label>
      <input className=' form-control' name='password' type='password'  onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.password} />
      {Formik.errors.password&& Formik.touched.password?<div className=' alert alert-danger'>{Formik.errors.password}</div>:''}
    
      {/* pass */}
        {/* repass */}
     <label htmlFor="rePassword">Re Password</label>
      <input  type='password'   className=' form-control' name='rePassword'  onChange={Formik.handleChange} onBlur={Formik.handleBlur} value={Formik.values.rePassword} />
      {Formik.errors.rePassword&& Formik.touched.rePassword?<div className=' alert alert-danger'>{Formik.errors.rePassword}</div>:''}

    {Error!=null?<p className=' py-2 text-danger fw-bolder'>{Error}</p>:''}
  
      <button disabled={!(Formik.dirty&&Formik.isValid)} type='submit' className=' btn bg-main text-white my-3'>Register
      {Loading?<span> <i className='fa-solid fa-spinner text-light fa-spin ms-2'></i></span> :''}
       </button>
    </form>
      <p className='text-muted'> I have a Acoount <Link className='text-main text-decoration-none fw-bolder' to='/Login'>Signin</Link></p>
  
    </div>
    
    
    
    
    </>
    
      
   
  )
}


