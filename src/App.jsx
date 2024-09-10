/* eslint-disable no-unused-vars */
 
 

import './App.css'
import { createHashRouter,RouterProvider} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Wishlist from './components/Wishlist/Wishlist';
import Notfound from './components/Notfound/Notfound';
import Welcome from './components/Welcome/Welcome';
import Verify from './components/Verify/Verify';
import CounterContextProvider from './components/Context/Context';
import UserContextProvider from './components/UserContext/UserContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider, { CartContext } from './components/CartContext/CartContext';
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider, { WishlistContext } from './components/WishlistContext/WishlistContext';
import CheckOut from './components/CheckOut/CheckOut';



function App() {
  let x=createHashRouter([{path:"",element:<Layout/>,
    children:[
    {index:true,element:<Home/>},
    {path:"cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:"welcome",element:<Welcome/>},
    {path:"Categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:"Brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:"wishlist",element:<ProtectedRoutes><Wishlist/></ProtectedRoutes>},
    {path:"productdetails/:id/:category",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:"*",element:<ProtectedRoutes><Notfound/></ProtectedRoutes>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"verify",element:<Verify/>},
    {path:"checkout",element:<CheckOut/>}
   
  ]}])
 
  return <>
  <UserContextProvider>
  <CounterContextProvider>
   <CartContextProvider>
    <WishlistContextProvider>
      <RouterProvider router={x}></RouterProvider>

      <Toaster/>
      </WishlistContextProvider>
      </CartContextProvider>
      </CounterContextProvider>
      </UserContextProvider>
  </>
  
}


export default App
