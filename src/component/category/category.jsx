import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";
import  { BallTriangle, ColorRing } from'react-loader-spinner'
import { Helmet } from 'react-helmet';






export default function Category() {
  let[subCategory,SetSub]=useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    
  };
  function gC(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  };
  let {data,isError,isLoading}=useQuery('category',gC);
  async function getSubCa(){
    let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`);
    SetSub(data.data)
  }
  useEffect(()=>{
getSubCa();
  },[])


 

  return (<>
  <Helmet>
<meta charSet="utf-8" />
<title>category</title>
</Helmet>
  <Slider {...settings}>
  {
    isLoading?<div className='  d-flex justify-content-center align-items-center vh-100'>   <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    /></div>: data?.data.data.map((c)=>{
      return <>
      <img src={c.image} className='w-100' height={300} alt="" />
      <h4 className='p-2'>{c.name}</h4>
      </> 
    })
    
  } </Slider>
  {isLoading?
  <div className=' vh-100 d-flex flex-column justify-content-center align-items-center'>
     <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
  </div>
: <div className='row py-5'>
  {data.data.data.map((category)=>{
    return <div className="col-md-4 my-4">
      <img src={category.image} alt="" className='w-100' height={200} />
      <h5 className=' fw-bold text-main text-center'>{category.name}</h5>
    </div>
  })}
</div>}

<div className="suncategory">
  <h5>Sub category</h5>
  <div className="item d-flex flex-wrap">
   {subCategory.map((name)=>{
    return <button className=' m-2 btn bg-main text-white'>
    {name.name}
   </button>
    
   })}
  </div>
</div>
 
  
  </>
   
  )
}
