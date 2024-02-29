
import React, { useContext, useState } from 'react';
import {Formik, useFormik} from'formik';
import * as Yup from'yup';
import axios from'axios'
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/UserToken';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  let gate=useNavigate();
  let[errorx,seterror]=useState();
  let[response,SetResponse]=useState();
  let validationSchema=Yup.object({
    email:Yup.string().email('Email is invalid').required('Email is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/,'Password Must Start With Upper Case').required('password Is Required'),
  });


  async function ResetCode(resetCode){
    let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
      resetCode:resetCode,
  }).then((response)=>{
    toast.success('Valid Reset Code')
    SetResponse(response.data.status)
  }).catch((error)=>{
  toast.error(error.response.data.message)
    seterror(error.response.data.message)
  })

  if(response!=''){
    gate('/new')

  }
 
  }
  let formik=useFormik({
    initialValues:{
      resetCode:'',
    },
    onSubmit:()=>{
      ResetCode(formik.values.resetCode)
    }
  });


 
  return (
 <>
 <Helmet>
<meta charSet="utf-8" />
<title>ResetPassword</title>
</Helmet>
   <div className="container  py-5  w-50">
    <h3 className='mainColor py-2'>Register Now</h3>
  <form onSubmit={formik.handleSubmit} >
        {/* mail */}
    <label htmlFor="">Reset Code</label>
    <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode}  className=' form-control' type='text' name='resetCode' />
    <button type='submit' className=' bg-main btn text-light my-3'> Confirm </button>
      {/* mail */}
      {errorx? <p className=' alert alert-danger'>{errorx}</p>:''}

      



  </form>
 

  

  </div>
 
 </>
  )
}
