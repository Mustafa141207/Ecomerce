import React, { useContext } from 'react'
import Product from '../Product/Product'
import Category from '../category/category'
import Brands from '../Brands/Brands'
import Cart from '../cart/cart'
import { Helmet } from 'react-helmet'




export default function Home() {

  return (
   <>
   <Helmet>
<meta charSet="utf-8" />
<title>Home</title>
</Helmet>
   <h2 className=' fw-bold py-2'>Category</h2>
   <Category/>
   <h2 className='py-2 fw-bold'>Products</h2>
   <Product/>
   <h2 className='py-2 fw-bold'>Your Cart</h2>
   <Cart/>
   
   </>
  )
}
