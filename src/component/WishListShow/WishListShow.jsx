import React, { useContext, useState } from 'react'
import { WishListContext } from '../../Context/WishList'
import { useQuery } from 'react-query';
import { Cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function WishListShow() {
  let{addToCart,Setcartnumber}=useContext(Cartcontext)
  let {ShowList,count,Setcount,DeleteList}=useContext(WishListContext);
 
  async function addToMycart(productId){
    let {data}= await addToCart(productId);
    if(data.status=='success'){
      toast.success(data.message);
      Setcartnumber(data.numOfCartItems);
    }else{
      toast.error('Not Add To Cart')
    }
  }
  
  let{data,isLoading}=useQuery('Show',ShowList);
  Setcount(data?.data.count);
  async function Delete(id){
   let {data}= await DeleteList(id);
   if(data.status=='success'){
    toast.success(data.message);
    Setcount(count-1);
  }
  }
  return (
 <>
 <Helmet>
<meta charSet="utf-8" />
<title>Wish List</title>
</Helmet>
 <div className='container w-75 bg-light shadow-lg p-5 '>
  <h3 className=' text-main fw-bold'>Wishing List</h3>
  <h3>Count: {count}</h3>
  {isLoading?'d': <div className='row g-4'>
  {data?.data.data.map((fav)=>{
    return <div className="col-md-4 py-4">
     <img src={fav.imageCover} className='w-100' alt=""  />
     <h4 className='my-3 fw-bold text-main'>{fav.title.slice('').split('').slice(0,15).join('')}</h4>
     <div className=' d-flex justify-content-between align-items-center fw-bold'>
     <p className=''>{fav.price} EGB</p>
        <p>{fav.ratingsAverage}<i className='fa-solid fa-star rating-color '></i></p>
     </div>
     <button onClick={()=>{
      Delete(fav.id)
     }} className=' btn p-0 m-0 my-2 border-0'>
     <i class="fa-solid fa-trash-can text-danger"></i>
     </button>
     <button onClick={()=>{
         addToMycart(fav.id)
        }} className='btn text-light bg-main w-100'>Add to cart</button>
    </div>
  })}
    
    
    
    </div>}
 </div>
 
 </>
  )
}
