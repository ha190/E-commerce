/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };

  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getProductsFromCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteProductsFromCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function updateCartProductQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        { headers }
      )
      .then((res) =>res)
      .catch((err) => err);
  }

function emptyCart() {
    return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    }).then((res) => res)
    .catch((err) => err);

  }
  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          getProductsFromCart,
          deleteProductsFromCart,
          updateCartProductQuantity,
          emptyCart,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
}
