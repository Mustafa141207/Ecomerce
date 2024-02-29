import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TokenContext } from '../../Context/UserToken'
import { Cartcontext } from '../../Context/Cartcontext';
import { WishListContext } from '../../Context/WishList';





export default function Navbar() {
  let {Cartnumber,getto}=useContext(Cartcontext);
  let {count,Setcount}=useContext(WishListContext);

  let Gate=useNavigate();
  let {Token,SetToken}=useContext(TokenContext);
  function logOut(){
    localStorage.removeItem('UserToken');
    SetToken(null);
    Gate('/login');
  }




  return (
 <>

 <nav className="navbar navbar-expand-sm navbar-light bg-light">
  <div className="container">
  <a className="navbar-brand">
    logo
  </a>
 
   
    <button
      className="navbar-toggler d-lg-none"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapsibleNavId"
      aria-controls="collapsibleNavId"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
    {Token!=null? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
   
    
   <li className="nav-item">
     <Link className="nav-link" to='home'>Home </Link>
   </li>
   <li className="nav-item">
     <Link className="nav-link" to='category'>category</Link>
   </li>
   <li className="nav-item">
     <Link className="nav-link" to='brands'>Brands</Link>
   </li>
   <li className="nav-item">
     <Link className="nav-link" to='Product'>Products</Link>
   </li>
 
  
 </ul>:''}
     
 {Token==null? <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
      
      <li className="nav-item">
        <Link className="nav-link" to='login'>login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='reg'>Regeister</Link>
      </li></ul>:''}
     
        
{Token!=null? <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
         <li onClick={()=>{
          logOut()
         }} className="nav-item">
          <Link  className="nav-link">Log Out</Link>
        </li>
        <li className="nav-item">
     <Link className="nav-link" to='cart'><i className='fa-solid fa-shopping-cart text-main'></i>
     {Cartnumber==0?'':<span className=' fw-bolder badge bg-main text-light p-2 mx-2'>{Cartnumber}</span> } 
     </Link>
   </li>
        <li className="nav-item">
     <Link className="nav-link" to='List'><i class="fa-solid fa-list text-main"></i>
     {count==0?'': <span className=' fw-bolder badge bg-main text-light p-2 mx-2'>
      {count}</span> }
    

      
     </Link>
   </li>
        <li className="nav-item d-flex  align-items-center">
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-tiktok mx-2'></i>
          <i className='fab fa-linkidin'></i>
        </li>
       
      </ul>:''}
 
    </div>
  </div>
 </nav>
 
 
 
 
 </>
  )
}

