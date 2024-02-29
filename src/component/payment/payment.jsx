import axios, { Axios } from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { Cartcontext } from '../../Context/Cartcontext';
import { Helmet } from 'react-helmet';



export default function Payment() {

  let id='65dce58bbe8b5232353aadeb'
  let{CheckOut}=useContext(Cartcontext);
 async function Payment(val){
  let {data}= await CheckOut(id,val);

  if(data.status=='success'){
   
    window.location=data.session.url;

  }
 }
  let formik=useFormik({
    initialValues:{
      details: '',
    phone:'' ,
      city:'',
   
    }
    ,onSubmit:Payment,
  
  });





  return (
  <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Payment</title>
               
            </Helmet>
  <div className="container  py-5  w-50">
    <h3 className='mainColor py-2'>Payment Form</h3>
  <form onSubmit={formik.handleSubmit} >
        {/* mail */}
    <label htmlFor="details">Details</label>
    <input  onChange={formik.handleChange} value={formik.values.details}  className=' form-control' type='text' name='details' />

      {/* mail */}
        {/* pass */}
    <label htmlFor="phone">phone</label>
    <input   onChange={formik.handleChange} type='text'  value={formik.values.phone}  className=' form-control' name='phone' />
    <label htmlFor="city">city</label>
    <input   onChange={formik.handleChange} type='text'  value={formik.values.city}  className=' form-control' name='city' />
    {/* pass */}

    <button  type=' submit' className=' btn bg-main text-white my-3'>Check Out
    </button>
  </form>

  </div>
 
  
  
  </>
  )
}

