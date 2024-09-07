/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../WishlistContext/WishlistContext";
import { CartContext } from "../CartContext/CartContext";
import { toast } from 'react-hot-toast';


export default function Wishlist() {
  let { deleteProductfromWishlist, getuserWishlist } =
    useContext(WishlistContext);
const [wishlist,setwishlist]=useState(null)
let {addProductToCart}=useContext(CartContext)

    async function getwishlist(){
      let wishlist = await getuserWishlist();
      console.log(wishlist);
      setwishlist(wishlist.data.data)
    }
    async function addprotoCart(id){
      let added = await addProductToCart(id);
      { toast.success(added.data.message)}
      console.log(added);
    }
    async function deletefromwishlist(id){
      let wishlist = await deleteProductfromWishlist(id);
      console.log(wishlist);
      { toast.success(wishlist.data.message)}
      getwishlist()
    }


    useEffect(()=>{getwishlist()},[])
  return <>
  <div className="w-[70%] mx-auto bg-[#f8f9fa] py-10 mt-36">
    <h1 className="text-center font-semibold text-green-600 text-3xl">WishList <span className="font-[100px] ms-3">&#128147;</span></h1>
          
          
            {wishlist?.map((product) => (
              <div key={product?.id} className="flex justify-between w-full px-11">
                <div className="flex justify-between w-full py-10">
                  <div className="flex justify-start items-center gap-6">
                    <img src={product?.imageCover} alt="" className="w-1/5" />
                    <div>
                      <h3 className="py-4 font-semibold">{product?.title}</h3>
                      <h3 className="font-semibold text-green-700">{product?.price} EGP</h3>
                      <button
                        className="bg-transparent text-red-700 py-4"
                        onClick={()=>{deletefromwishlist(product.id)}}
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-6 w-1/2">
                  <button
                    className="rounded-lg bg-transparent  border-green-600 border-[1px] w-[200px] py-3"
                    type="submit"
                    onClick={()=>{addprotoCart(product.id)}}
                  > <p className="text-black">Add to Cart</p>
                  </button>
                  </div>
                </div>
              </div>
            ))}</div>

  
  
  </>;
}
