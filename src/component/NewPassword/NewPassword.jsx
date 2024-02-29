import React, { useContext, useState } from 'react';
import {Formik, useFormik} from'formik';
import * as Yup from'yup';
import axios from'axios'
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/UserToken';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';



export default function NewPassword() {
  let {Token,SetToken}=useContext(TokenContext);
  let gat=useNavigate();
  let validationSchema=Yup.object({
    email:Yup.string().email('Email is invalid').required('Email is required'),
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'Password Must Start With Upper Case').required('password Is Required'),
  });
async function EnterNewPass(email,pass){
  let data= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
    email:email,
    newPassword:pass,
}
).then((response)=>{
  SetToken(response.data.token)
  toast.success('Password Is Changed');
  gat('/home')


}).catch((error)=>{
 
})

}
  let formik=useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validationSchema:validationSchema,
    onSubmit:()=>{
      EnterNewPass(formik.values.email,formik.values.newPassword)
    }
  });
  return (
    <>
    <Helmet>
<meta charSet="utf-8" />
<title>New Password</title>
</Helmet>
    <div className="container  py-5  w-50">
      <h3 className='mainColor py-2'>Enter New Password</h3>
    <form onSubmit={formik.handleSubmit} >
          {/* mail */}
      <label htmlFor="email">Email</label>
      <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  className=' form-control' type='email' name='email' />
      {formik.errors.email&& formik.touched.email?<div className=' p-2 my-1 alert alert-danger'>{formik.errors.email}</div>:''}
        {/* mail */}
          {/* pass */}
      <label htmlFor="password">password</label>
      <input  onBlur={formik.handleBlur} onChange={formik.handleChange} type='password'  value={formik.values.newPassword}  className=' form-control' name='newPassword' />
      {formik.errors.newPassword&& formik.touched.newPassword?<div className=' p-2 my-1 alert alert-danger'>{formik.errors.newPassword}</div>:''}
      {/* pass */}
      <button disabled={!(formik.dirty&& formik.isValid)} type='submit' className=' btn bg-main text-white my-3'>Change Password</button>
    </form>

    </div>
   
    
    
    </>
    )
}
