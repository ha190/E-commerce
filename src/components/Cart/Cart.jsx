/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [empty, setEmpty] = useState(null);

  const {
    getProductsFromCart,
    deleteProductsFromCart,
    updateCartProductQuantity,
    emptyCart,
  } = useContext(CartContext);
  
  const [cartItems, setCartItems] = useState(null);

  async function updateCartItems(id, count) {
    setLoading(true);
    setCurrentId(id);
    let updatedItems = await updateCartProductQuantity(id, count);
    setCartItems(updatedItems.data.data);
    console.log(updatedItems.data);
    if (updatedItems.data.status === "success") {
      setLoading(false);
    }
  }

  async function getCartItems() {
    let items = await getProductsFromCart();
    setCartItems(items.data.data);
    console.log(items.data.data);
  }

  async function deleteCartItems(id) {
    let deletedItems = await deleteProductsFromCart(id);
    setCartItems(deletedItems.data.data);
    console.log(deletedItems.data.data);
  }

  async function emptyUserCart() {
    if (!cartItems || cartItems?.products.length === 0) {
      console.log("Cart is already empty");
    } else {
      let deletedItems = await emptyCart();
      setEmpty(deletedItems);
      console.log(deletedItems);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="w-[70%] mx-auto bg-[#f8f9fa] py-28 mt-16 flex justify-center items-center flex-col">
        <div className="flex justify-between w-full px-5">
          <h1 className="font-semibold text-3xl p-8">Cart Shop</h1>
          <div className="flex justify-center items-center flex-col w-1/4 gap-3">
         <Link to="/checkout"> <button className="w-[150px] bg-green-600 rounded-lg text-white py-2 px-3">
            Check Out
          </button></Link>
          <button
            className="w-[150px] bg-red-600 rounded-lg text-white py-2 px-3"
            onClick={() => emptyUserCart()}
          >
            Clear Your Cart
          </button>
        </div></div>


        {cartItems?.products.length === 0 || empty?.data.message === "success" ? (
          
          <div className="flex justify-center items-center flex-col w-full">
            <div className="flex justify-between w-full px-16">
              <h3 className="font-semibold py-4 mt-5">
                Total Price: <span className="text-green-600">0 EGP</span>
              </h3>
              <h3 className="font-semibold py-4 mt-5 capitalize">
                Total Number of Items: <span className="text-green-600">0</span>
              </h3>
            </div>
            <div className="text-2xl text-center font-semibold text-green-500 border border-green-500 rounded-xl p-6 mt-16">

            <h1 className="py-3">
              Your Cart is Empty
              <span className="font-[100px] ms-3">&#129335;</span>
            </h1>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between w-full px-11">
              <h3 className="font-semibold py-4 mt-5">
                Total Price: <span className="text-green-600">{cartItems?.totalCartPrice} EGP</span>
              </h3>
              <h3 className="font-semibold py-4 mt-5 capitalize">
                Total Number of Items: <span className="text-green-600">{cartItems?.products.length}</span>
              </h3>
            </div>
            {cartItems?.products.map((product) => (
              <div key={product.id} className="flex justify-between w-full px-11">
                <div className="flex justify-between w-full py-10">
                  <div className="flex justify-start items-center gap-6">
                    <img src={product.product.imageCover} alt="" className="w-1/3" />
                    <div>
                      <h3 className="py-4 font-semibold">{product.product.title}</h3>
                      <h3 className="font-semibold">{product.price} EGP</h3>
                      <button
                        className="bg-transparent text-red-700 py-4"
                        onClick={() => deleteCartItems(product.product.id)}
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-6">
                    <button
                      className="bg-green-600 text-white py-1 px-3 rounded-lg font-bold"
                      onClick={() => updateCartItems(product.product.id, product.count + 1)}
                    >
                      +
                    </button>
                    {loading && currentId === product.product.id ? (
                      <i className="fa-spin fa-spinner fa-solid text-lg text-black"></i>
                    ) : (
                      product.count
                    )}
                    <button
                      className="bg-green-600 text-white py-1 px-3 rounded-lg font-bold"
                      onClick={() => updateCartItems(product.product.id, product.count - 1)}
                    >
                      –
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}