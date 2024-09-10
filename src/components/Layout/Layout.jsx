/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
   
      <Navbar />
     
      <Outlet />
      
<div className="mt-auto">
      <Footer />
      </div>
    
    </>
  );
}
