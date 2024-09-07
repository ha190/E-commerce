/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  let [loading, setLoading] = useState(false);
  let [currentid, setcurrentid] = useState(null);
  let { addProductToCart } = useContext(CartContext);
  let { addProductToWishlist,getuserWishlist } = useContext(WishlistContext);

  async function addtoWishlist(id){
    let wishlist=await addProductToWishlist(id)
 console.log("added to wishlist data base:",wishlist)
  }

  async function addProducts(id) {
    let addition = await addProductToCart(id);
    setcurrentid(id);
    if (addition.data.status == "success") {
      setLoading(true);
      toast(addition.data.message, {
        duration: 1000,
        position: "top-center",
        icon: "👏",
      });
      // toast.success(addition.data.message)
    } else {
      // toast.error(addition.data.message)
      setLoading(true);
      toast(addition.data.message, {
        duration: 2000,
        position: "top-center",
        icon: "🤦‍♀️",
      });
    }
  }



  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const searchforProduct = products
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="w-[80%] mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg p-2 mb-5 w-full mt-32"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {products == null ? (
          <div className="loader-layer">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5 flex-wrap py-14">
            {searchforProduct.map((product) => (
              <div
                key={product.id}
                className="md:w-1/3 lg:w-1/6 p-5 hover:shadow-md hover:shadow-green-500 rounded-lg transition-shadow duration-300 product"
              >
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    alt=""
                    className="w-full rounded-t-lg"
                  />
                  <h4 className="text-green-600 font-thin py-3">
                    {product.category.name}
                  </h4>
                  <p className="text-black font-thin">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-black font-thin">{product.price} EGP</p>
                    <div className="flex items-center">
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      <p className="text-[#808080] font-thin py-3">
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between items-center">
                  <button
                    className="btn w-3/4"
                    type="submit"
                    onClick={() => addProducts(product.id)}
                  >
                    {loading && currentid == product.id ? (
                      <i className="fa-solid fa-spinner fa-spin text-lg text-white"></i>
                    ) : (
                      <p className="text-white">Add to Cart</p>
                    )}
                  </button>
                  <i
                    className={`fa-solid fa-heart text-[grey] text-xl`}
                    onClick={() => {addtoWishlist(product.id)}}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
