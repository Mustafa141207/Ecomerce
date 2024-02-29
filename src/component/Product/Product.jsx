import axios, { Axios } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import  { BallTriangle } from'react-loader-spinner'
import { useQuery } from 'react-query';
import { Await, Link } from 'react-router-dom';
import { Cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishList';
import { Helmet } from 'react-helmet';







export default function Product() {
let{AddtoWish,count,Setcount}=useContext(WishListContext);
  let {addToCart,Cartnumber,Setcartnumber}=useContext(Cartcontext);
async function Add(id){
  let {data}=await AddtoWish(id);

  if(data.status=='success'){
    toast.success(data. message);
    Setcount(count+1)
  }else{
    toast.error(data. message)
  }
}
 async function addToMycart(productId){
  let response= await addToCart(productId)
  if(response.data.status=='success'){
    toast.success(response.data.message);
    Setcartnumber(response.data.numOfCartItems);
  }else{
    toast.error('Not Add To Cart');
  }
  }
    const[productList,setProduct]=useState([]);

 function getP(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
 };

 let {data,isError,isFetched,isLoading}=useQuery('getProduct',getP);;
  return (
    <>
    {isLoading?  <div className='  d-flex justify-content-center align-items-center vh-100'>   <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    /></div>: <div className="row g-3">
    {data?.data.data.map((product)=>{
      return(<>
      <div className="col-md-2">
        <div className="product cursor-pointer p-2 ">
        <button onClick={()=>{
          Add(product.id)
        }}    className='btn border-0'><i id='Add' class="fa-solid fa-heart text-main"></i> </button>
          <Link className=' text-decoration-none text-black' to={`/Details/${product.id}`}>
        <img src={product.imageCover} className='w-100' height={300} alt={product.title} />
        <p className='text-main fw-bold '>{product.category.name}</p>
        <h6>{product.title}</h6>
        <div className='d-flex justify-content-between align-items-center'>
        <p className=''>{product.price} EGB</p>
        <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color '></i></p>
        </div>
        </Link>
        <button onClick={()=>{
          addToMycart(product.id)
        }} className='btn text-light bg-main w-100'>Add to cart</button>
        </div>
      </div> 
      
      
      </>)
    })}
  </div>}
 :
  
    
    
 

   

  
    </>

  )
}
