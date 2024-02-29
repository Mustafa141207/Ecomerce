import axios from "axios";
import { createContext, useState } from "react";


export let Cartcontext=createContext();
export default function CartcontextProvider(Key){
    let headers={
        token:localStorage.getItem('UserToken')
    }
    const[Cartnumber,Setcartnumber]=useState('');

    async function addToCart(id){
      return  axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            // body
            productId:id,
        },{
            // headers
            headers:{
                token:localStorage.getItem('UserToken')
            }
        }).then((resposne)=> resposne).catch((error)=>error)
     
    }
    async function getToCart(){
  return  axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            // headers
            headers:{
                token:localStorage.getItem('UserToken')
            }
        }).then((resposne)=> resposne).catch((error)=>error)
    }
    async function UpCount(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count:count,
        },{
            headers
           
        }).then((resposne)=> resposne).catch((error)=>error)
    }
  async function DeleteItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
    .then((resposne)=>resposne).catch((error)=> error)
  }
  async function DeleteCart(){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
        headers
    })
  }
  async function CheckOut(id,formData){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
        shippingAddress:formData
    },{
        headers
    },)
  }
    return<Cartcontext.Provider value={{addToCart,Cartnumber,Setcartnumber,getToCart,DeleteItem,UpCount,DeleteCart,CheckOut}}>
        {Key.children}
    </Cartcontext.Provider>
}