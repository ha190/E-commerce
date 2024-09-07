/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import photo from "../../assets/9212299.jpg";
import { Link } from "react-router-dom";
import { UserContext } from "./../UserContext/UserContext";

export default function Welcome() {
  let { userLogin } = useContext(UserContext);

  return (
    <>
      <div className="h-full flex justify-center items-center flex-col ">
        <h1 className="font-bold italic sm:text-xl md:text-5xl pt-32 pb-6">
          <i className="fa-solid fa-basket-shopping fs-4 text-green-800"></i>{" "}
          Welcome to FreshCart{" "}
          <i className="fa-solid fa-basket-shopping fs-4 text-green-800"></i>
        </h1>
        <img src={photo} alt="" className="w-1/4" />
        {userLogin ==null ? (
          <Link to="/login">
            {" "}
            <button className=" rounded-md bg-green-700 px-4 py-2 text-white mt-3 hover:bg-green-950 duration-500">
              Login
            </button>
          </Link>
        ) : null}
      </div>
    </>
  );
}
