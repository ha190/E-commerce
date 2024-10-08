/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useState } from "react";

export let WishlistContext = createContext();
export default function WishlistContextProvider(props){
let [wishnum,setwishnum]=useState(0)
let headers={token:localStorage.getItem("userToken")}
    function addProductToWishlist(id) {
        return axios
          .post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            {
              productId: id,
            },
            { headers }
          )
          .then((res) => res)
          .catch((err) => err);
      }
    function deleteProductfromWishlist(id) {
        return axios
          .delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            { headers }
          )
          .then((res) => res)
          .catch((err) => err);
      }
    function getuserWishlist() {
        return axios
          .get(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { headers }
          )
          .then((res) => {
            setwishnum(res.data.count)
            return res})
          .catch((err) => err);
      }


    return (
        <>
          <WishlistContext.Provider
            value={{
                addProductToWishlist,
                deleteProductfromWishlist,
                getuserWishlist,
                wishnum,setwishnum
            }}
          >
            {props.children}
          </WishlistContext.Provider>
        </>
      );
}
