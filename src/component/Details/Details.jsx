import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import  { BallTriangle } from'react-loader-spinner'
import { Cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';





<BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />


export default function Details() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  let{Cartnumber,Setcartnumber}=useContext(Cartcontext)
  let {addToCart}=useContext(Cartcontext);
  let key=useParams();
  


  async function addToMycart(productId){
    let response= await addToCart(productId)
    if(response.data.status=='success'){
      toast.success(response.data.message)
      Setcartnumber(response.data.numOfCartItems);
    }else{
      toast.error('Not Add To Cart')
    }
   
    }


  function getDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let {isError,isLoading,data} =useQuery('ProductDetails',()=>getDetails(key.ID));
 






  return (
  <>
   <Helmet>
<meta charSet="utf-8" />
<title>Details</title>
</Helmet>
    {data?.data.data?
     <div className="row justify-content-center align-items-center">
    <div className="col-md-4">
    <Slider {...settings}>
      {data?.data.data.images.map((img)=>{
      
       return <img src={img} className='w-100' alt="" />
       
       
      })}
 
      </Slider>
    </div>
    <div className="col-md-8">
     <h5 className=' h5 fw-bolder'>${data.data.data.title}</h5>
      <p>${data.data.data.description}</p>
      <p className=' fw-bold text-main'>  {data.data.data.brand.name}</p>
      <p className=' fw-bold text-main'>  {data.data.data.category.name}</p>
      <p className=' fw-bold'> Stock : {data.data.data.quantity}</p>
      <div className=' d-flex align-items-center justify-content-between'>
      <p className=' fw-bold '> Price :   {data.data.data.price} EGB</p>
      <p className=' '>{data.data.data.ratingsAverage} <i className='fa-solid fa-star rating-color '></i></p>
      </div>
      <button onClick={()=>{
        addToMycart(data.data.data.id);
      }} className=' text-light btn bg-main w-100'>Add to cart</button>
    
    </div>
    </div>
  
    


  :''}



 


  
  
  </>
  )
}
