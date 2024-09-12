/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numberItems, setNumberItems] = useState(0);
  const [cartId, setCartId] = useState(null); // Initialize as null
  const token = localStorage.getItem("userToken");
  const headers = { token };

  const goToCheckOut = (cartId, url, formData) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error during checkout:", error);
        return error
      });
  };

  const addProductToCart = (id) => {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        throw error;
      });
  };

  const getProductsFromCart = () => {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        setNumberItems(response.data.numOfCartItems);
        setCartId(response.data.data._id);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching products from cart:", error);
        throw error;
      });
  };

  const deleteProductsFromCart = (id) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((error) => {
        console.error("Error deleting product from cart:", error);
        throw error;
      });
  };

  const updateCartProductQuantity = (id, count) => {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => {
        console.error("Error updating cart product quantity:", error);
        throw error;
      });
  };

  const emptyCart = () => {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => response)
      .catch((error) => {
        console.error("Error emptying the cart:", error);
        throw error;
      });
  };

  useEffect(() => {
    getProductsFromCart();
  }, []); 

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getProductsFromCart,
        deleteProductsFromCart,
        updateCartProductQuantity,
        emptyCart,
        numberItems,
        setNumberItems,
        goToCheckOut,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}