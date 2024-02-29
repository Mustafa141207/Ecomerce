import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from '../../Context/Cartcontext'
import axios from 'axios';
import { useQuery } from 'react-query';
import  { BallTriangle } from'react-loader-spinner'
import { Link } from 'react-router-dom';
export default function Cart() {
let[cartItem,SetItem]=useState()
let[price,getPrice]=useState();
  let{getToCart,Cartnumber,DeleteItem,UpCount,DeleteCart,Setcartnumber}=useContext(Cartcontext);
 async function getData(){
  let {data}= await getToCart();
  SetItem(data);
  getPrice();
  }
 useEffect(()=>{
  getData();
 })
async function remove(x){
  let {data}= await DeleteItem(x);
Setcartnumber(Cartnumber-1)
  SetItem(data);
}
async function UbdateCount(id,count){
 let{data}= await UpCount(id,count);
 SetItem(data);
}
async function DeleteAll(){
  let{data}= await DeleteCart();
  Setcartnumber()
  SetItem('')
}

return(<>
{cartItem?
<div className="container w-75 bg-light shadow-lg p-5">
  <h3>Shopping Cart</h3>
  <h4 className=' fw-bolder text-main'>Cart Item: {cartItem.numOfCartItems}</h4>
  <h5 className=' fw-bolder text-main'>Cart prise {cartItem.data.totalCartPrice}</h5>
  <button onClick={()=>{
    DeleteAll();
  }} className=' border-0 fw-bolder btn'>  <i className="fa-solid fa-trash-can text-danger " > </i> Delete Cart </button>

  <div>
    {cartItem.data.products.map((product)=>{
    return   <div className="row my-4  border-bottom-4" key={product.product.id}>
    <div className="col-md-2">
      <img src={product.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-10">
      <div className='d-flex justify-content-between align-items-center'>
        <div className="left">
          <p className='h6'>{product.product.title.split('').slice(0,20).join('')} </p>
          <p className=' text-main fw-bold'>{product.price} EGP </p>
          <button onClick={()=>{
            remove(product.product.id)
          }} className=' bg-light border-0'> <i className="fa-solid fa-trash-can text-danger fs-5" ></i> Remove </button>
         
        </div>
        <div className="right">
          <button onClick={()=>{
            UbdateCount(product.product.id,product.count+1)
          }} className='bg-main border-0  text-light'>+</button>
          <span className=' mx-2 fw-bolder p-2'>{product.count}</span>
          <button  onClick={()=>{
            UbdateCount(product.product.id,product.count-1)
          }} className='bg-danger text-light   border-0'>-</button>
        </div>
      </div>
    </div>
  </div>
    })}
    <div className='d-flex justify-content-end'>
      <Link  to="/CheckOut">
      <button className='btn text-light bg-main me-auto'>Check Out</button>

      </Link>


    </div>
    
    

  </div>


</div>










:<div className='container w-75 bg-light shadow-lg p-5 '>
  <h3>Shopping Cart</h3>
</div>
  }
</>)
 
}
