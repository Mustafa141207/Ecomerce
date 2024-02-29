import logo from './logo.svg';
import './App.css';
import Home from './component/home/home';
import Master from'./component/master/master';
import Cart from'./component/cart/cart';
import Category from"./component/category/category";
import Login from"./component/login/login";
import Brands from'./component/Brands/Brands';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Register from './component/register/Register';
import Product from'./component/Product/Product';
import TokenContextProvider from './Context/UserToken';
import Details from './component/Details/Details';
import CartcontextProvider from './Context/Cartcontext';
import  { Toaster } from 'react-hot-toast';
import Payment from './component/payment/payment';
import WishListProvider from './Context/WishList';

import WishListShow from './component/WishListShow/WishListShow';
import ResetPassword from './component/ResetPassword/ResetPassword';
import NewPassword from './component/NewPassword/NewPassword';









let router=createBrowserRouter([{
  path:'',element:<Master/>,children:[
    {path:'',element:<Login/>},
    {path:'home',element:<Home/>},
    {path:'category',element:<Category/>},
    {path:'cart',element:<Cart/>},
    {path:'login',element:<Login/>},
    {path:'reg',element:<Register/>},
    {path:'brands',element:<Brands/>},
    {path:'Product',element:<Product/>},
    {path:'Details/:ID',element:<Details/>},
    {path:'CheckOut',element:<Payment/>},
    {path:'List',element:<WishListShow/>},
    {path:'Reset',element:<ResetPassword/>},
    {path:'new',element:<NewPassword/>},
  ]
}]);


function App() {

  return (
<>
<WishListProvider>
<CartcontextProvider>
<TokenContextProvider>
<RouterProvider router={router}/>
</TokenContextProvider>
<Toaster/>
</CartcontextProvider>
</WishListProvider>

</>
  );
};

export default App;
