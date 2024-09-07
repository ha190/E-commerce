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
  let { id, category } = useParams();
  let [currentid, setcurrentid] = useState(null);
  const [loading, setLoading] = useState(false);
  let { addProductToCart } = useContext(CartContext);
  const [likedProducts, setLikedProducts] = useState({});
  let [object, setObject] = useState(null);
  let [relatedProducts, setrelatedProducts] = useState([]);
  let { addProductToWishlist,getuserWishlist } = useContext(WishlistContext);

  async function addtoWishlist(id){
    let wishlist=await addProductToWishlist(id)
 console.log("added to wishlist data base:",wishlist)
 toast.success(wishlist.data.message)
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
  var settings = {
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

  function toggleLike(productId) {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    console.log(likedProducts);
  }

  function getSpecficProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res);
        setObject(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getallProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProducts(related);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  useEffect(() => {
    getSpecficProduct(id);
    getallProducts();
  }, [id, category]);

  return (
    <>
      <div className="flex justify-center items-center gap-5 pt-28 w-[70%] mx-auto">
        <div className="w-1/3 h-full">
          <Slider {...settings}>
            {object?.images.map((image) => (
              <div key={image.id}>
                <img
                  src={image}
                  alt="product image"
                  className="w-full h-full "
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-2/3 h-full">
          <div className="py-3">
            <h1 className="font-semibold py-4">{object?.title}</h1>
            <p className="font-thin text-black">{object?.description}</p>
            <div className="flex justify-between py-5">
              <p>{object?.price} EGP</p>{" "}
              <div>
                <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                {object?.ratingsAverage}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between py-6">
          <button
                    className="bg-green-600 w-3/4 py-2 rounded-lg ms-4 "
                    type="submit"
                    onClick={() => addProducts(object?.id)}
                  >
                    {loading && currentid == object?.id ? (
                      <i className="fa-solid fa-spinner fa-spin text-lg text-white"></i>
                    ) : (
                      <p className="text-white">Add to Cart</p>
                    )}
                  </button>
                  <i
                    className={`fa-solid fa-heart text-[grey] text-xl`}
                    onClick={() => {addtoWishlist(object?.id)}}
                    style={{ cursor: "pointer" }}
                  ></i>
          </div>
        </div>
      </div>
      <h3 className="text-green-800 font-semibold text-center text-xl mt-12">
        You also might like...
      </h3>

      <div className="flex justify-center items-center gap-5 flex-wrap w-[50%] mx-auto">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="md:w-1/3 lg:w-1/4 p-5 hover:shadow-md hover:shadow-green-500 rounded-lg transition-shadow duration-300 product"
          >
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
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
              <button className="btn" type="submit">
                {" "}
                Add to Cart
              </button>
              <i
                className={`fa-solid fa-heart text-[grey] text-xl ${
                  likedProducts[product.id] ? "text-red-600" : "text-grey"
                }`}
                onClick={() => toggleLike(product.id)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
