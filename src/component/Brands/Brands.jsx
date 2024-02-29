import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

export default function Brands() {
  function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }
  let{data}=useQuery('Brands',getBrands);
  let Brands=data?.data.data;

  return (
   <>
   <Helmet>
<meta charSet="utf-8" />
<title>Brands</title>
</Helmet>
   {data?.data.data? <div className='row'key={data.data.data.id}>
    {data.data.data.map((brand)=>{
      return <div className="col-md-3 cursor-pointer" key={brand.id}>
        <img src={brand.image} className='w-100' alt="" />
        <h6 className=' text-main fw-bolder text-center'>{brand.name}</h6>
      </div>
    })}
   </div>:''}
 
   
   
   </>
  )
}
