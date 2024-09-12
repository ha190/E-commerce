/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { updateCartProductQuantity,numberItems,setnumberItems } = useContext(CartContext); 
  const { wishnum,setwishnum } = useContext(WishlistContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  useEffect(() => {
    const updateCartCount = async () => {
      const result = await updateCartProductQuantity();
    };

    updateCartCount();
  }, [updateCartProductQuantity]);

  return (
    <nav className="bg-slate-100 p-5 fixed top-0 left-0 right-0 flex justify-around items-center z-50">
      <div>
        <Link to="/welcome">
          <img src={logo} alt="Freshcart Logo" className="w-full" />
        </Link>
      </div>
      <div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i
            className={`fa-solid fa-${isMenuOpen ? "times" : "bars"} text-xl`}
          ></i>
        </button>
        <div className={`md:flex md:flex-row md:items-center md:justify-between ${isMenuOpen ? "block" : "hidden"}`}>
          {userLogin ? (
            <ul className={`md:flex md:flex-row md:gap-4 ${isMenuOpen ? "block" : "hidden"}`}>
              <li><Link to="">Home</Link></li>
              <li><Link to="cart">Cart</Link></li>
              <li className="relative"><Link to="wishlist">Wishlist</Link>
              <div className="absolute top-[0px] right-[15px]  md:top-[-10px] md:right-[-15px] w-5 h-5 bg-green-600 rounded-md font-bold text-white flex justify-center items-center p-1">
                   {wishnum}
                    </div></li>
              <li><Link to="products">Products</Link></li>
              <li><Link to="categories">Categories</Link></li>
              <li><Link to="brands">Brands</Link></li>
              <li>
                <div className="flex justify-center items-center gap-6 relative">
                  <Link to="cart">
                    <i className="fa-solid fa-cart-shopping text-2xl mt-3 md:mt-0"></i>
                    <div className="absolute top-[0px] right-[15px]  md:top-[-15px] md:right-[-5px] w-5 h-5 bg-green-600 rounded-md font-bold text-white flex justify-center items-center p-1">
                   {numberItems}
                    </div>
                  </Link>
                </div>
              </li>
              <li>
                <span onClick={signout} className="cursor-pointer">Logout</span>
              </li>
            </ul>
          ) : (
            <ul className={`md:flex md:flex-row md:gap-4 ${isMenuOpen ? "block" : "hidden"}`}>
              <li><Link to="register">Register</Link></li>
              <li><Link to="login">Login</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}