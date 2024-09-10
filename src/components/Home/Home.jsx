/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainSlider from "./../MainSlider/MainSlider";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, deleteProductfromWishlist, getuserWishlist } = useContext(WishlistContext);

  async function fetchUserWishlist() {
    const res = await getuserWishlist();
    if (res.data && res.data.data) {
      const likedIds = res.data.data.map(product => product.id); 
      setLikedProducts(likedIds);
    }
  }

  async function toggleWishlist(id) {
    const isLiked = likedProducts.includes(id);
    if (isLiked) {
      await deleteProductfromWishlist(id);
      setLikedProducts(likedProducts.filter(productId => productId !== id));
      toast("Removed from wishlist", { duration: 1500, position: "top-center", icon: "🌚" });
    } else {
      await addProductToWishlist(id);
      setLikedProducts([...likedProducts, id]);
      toast("Added to wishlist", { duration: 1500, position: "top-center", icon: "💞" });
    }
  }

  async function addProducts(id) {
    const addition = await addProductToCart(id);
    setCurrentId(id);
    toast(addition.data.message, { duration: 1500, position: "top-center", icon: addition.data.status === "success" ? "👏" : "🤦‍♀️" });
  }

  function getProducts() {
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then(res => {
        setProducts(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProducts();
    fetchUserWishlist(); // Fetch the user's wishlist on mount
  }, []);

  const searchForProduct = products ? products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <div className="w-[80%] mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg p-2 mb-5 w-full mt-14"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {products == null ? (
          <div className="loader-layer">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5 flex-wrap py-14">
            {searchForProduct.map((product) => (
              <div
                key={product.id}
                className="md:w-1/3 lg:w-1/6 p-5 hover:shadow-md rounded-lg transition-shadow duration-300 product"
              >
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img
                    src={product.imageCover}
                    alt=""
                    className="w-full rounded-t-lg"
                  />
                  <h4 className="text-green-600 font-thin py-3">{product.category.name}</h4>
                  <p className="text-black font-thin">{product.title.split(" ").slice(0, 2).join(" ")}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-black font-thin">{product.price} EGP</p>
                    <div className="flex items-center">
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      <p className="text-[#808080] font-thin py-3">{product.ratingsAverage}</p>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between items-center">
                  <button
                    className="btn w-3/4"
                    type="submit"
                    onClick={() => addProducts(product.id)}
                  >
                    {loading && currentId === product.id ? (
                      <i className="fa-solid fa-spinner fa-spin text-lg text-white"></i>
                    ) : (
                      <p className="text-white">Add to Cart</p>
                    )}
                  </button>
                  <i
                    className={`fa-solid fa-heart text-xl ${likedProducts.includes(product.id) ? 'text-red-500' : 'text-[grey]'}`}
                    onClick={() => toggleWishlist(product.id)}
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