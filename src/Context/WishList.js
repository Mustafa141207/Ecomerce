import axios from "axios";
import { createContext, useState } from "react";


export let WishListContext=createContext();
export default function WishListProvider(key){
    let[count,Setcount]=useState();

    async function AddtoWish(id){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                productId: id,
        },{
            headers:{
                token:localStorage.getItem('UserToken')
            }
        }).then((resposne)=> resposne).catch((error)=>error)
    }
    async function ShowList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:{
                token:localStorage.getItem('UserToken')
            }
        }).then((resposne)=> resposne).catch((error)=>error)
    }
    async function DeleteList(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token:localStorage.getItem('UserToken')
            }
        })
    }
    return <WishListContext.Provider value={{AddtoWish,ShowList,count,Setcount,DeleteList}}>
        {key.children}
    </WishListContext.Provider>
}