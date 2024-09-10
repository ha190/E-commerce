/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function ProductDetails() {
  const { id, category } = useParams();
  const [currentId, setCurrentId] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addProductToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addProductToWishlist, getuserWishlist, deleteProductfromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetchUserWishlist();
    getSpecficProduct(id);
    getAllProducts();
  }, [id, category]);

  async function fetchUserWishlist() {
    const res = await getuserWishlist();
    if (res.data && res.data.data) {
      const likedIds = res.data.data.map(product => product.id);
      setLikedProducts(likedIds);
    }
  }

  async function toggleWishlist(productId) {
    const isLiked = likedProducts.includes(productId);
    if (isLiked) {
      await deleteProductfromWishlist(productId);
      setLikedProducts(likedProducts.filter(id => id !== productId));
      toast("Removed from wishlist", { duration: 1500, position: "top-center", icon: "🌚" });
    } else {
      await addProductToWishlist(productId);
      setLikedProducts([...likedProducts, productId]);
      toast("Added to wishlist", { duration: 1500, position: "top-center", icon: "💞" });
    }
  }

  async function addProducts(productId) {
    setCurrentId(productId);
    setLoading(true);
    const addition = await addProductToCart(productId);
    toast(addition.data.message, {
      duration: addition.data.status === "success" ? 1000 : 2000,
      position: "top-center",
      icon: addition.data.status === "success" ? "👏" : "🤦‍♀️",
    });
    setLoading(false);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    centerPadding: 0,
  };

  async function getSpecficProduct(productId) {
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProduct(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllProducts() {
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const related = res.data.data.filter(product => product.category.name === category);
      setRelatedProducts(related);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center gap-5 pt-28 w-[70%] mx-auto">
        <div className="w-1/3 h-full">
          <Slider {...settings}>
            {product?.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt="Product"
                  className="w-full h-full"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-2/3 h-full">
          <div className="py-3">
            <h1 className="font-semibold py-4">{product?.title}</h1>
            <p className="font-thin text-black">{product?.description}</p>
            <div className="flex justify-between py-5">
              <p>{product?.price} EGP</p>
              <div>
                <i className="fa-solid fa-star text-yellow-400"></i>
                {product?.ratingsAverage}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between py-6">
            <button
              className="bg-green-600 w-3/4 py-2 rounded-lg ms-4"
              onClick={() => addProducts(product?.id)}
            >
              {loading && currentId === product?.id ? (
                <i className="fa-solid fa-spinner fa-spin text-lg text-white"></i>
              ) : (
                <p className="text-white">Add to Cart</p>
              )}
            </button>
            <i
              className={`fa-solid fa-heart text-xl ${likedProducts.includes(product?.id) ? 'text-red-500' : 'text-[grey]'}`}
              onClick={() => toggleWishlist(product?.id)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
      </div>
      <h3 className="text-green-800 font-semibold text-center text-xl mt-12">
        You also might like...
      </h3>

      <div className="flex justify-center items-center gap-5 flex-wrap w-[50%] mx-auto">
        {relatedProducts.map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            className="md:w-1/3 lg:w-1/4 p-5 hover:shadow-md hover:shadow-green-500 rounded-lg transition-shadow duration-300 product"
          >
            <Link to={`/productdetails/${relatedProduct.id}/${relatedProduct.category.name}`}>
              <img
                src={relatedProduct.imageCover}
                alt=""
                className="w-full rounded-t-lg"
              />
              <h4 className="text-green-600 font-thin py-3">
                {relatedProduct.category.name}
              </h4>
              <p className="text-black font-thin">
                {relatedProduct.title.split(" ").slice(0, 2).join(" ")}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-black font-thin">{relatedProduct.price} EGP</p>
                <div className="flex items-center">
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  <p className="text-[#808080] font-thin py-3">
                    {relatedProduct.ratingsAverage}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex justify-between items-center">
              <button className="btn" type="submit">
                Add to Cart
              </button>
              <i
                className={`fa-solid fa-heart text-xl ${likedProducts.includes(relatedProduct.id) ? 'text-red-500' : 'text-[grey]'}`}
                onClick={() => toggleWishlist(relatedProduct.id)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}