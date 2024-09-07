/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



export default function CheckOut() {
    let validationSchema = Yup.object().shape({
      
      email: Yup.string().required("Email is required").email("invalid email"),
      phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number")
      .required("Phone is required"),
      city:Yup.string().required("City is required")
    });
 
    let formik = useFormik({
      initialValues: {
        
        details: "",
        phone: "",
        city:''
        
      },
      validationSchema,
    });

  return <>
<div className="w-[60%] mx-auto px-14 mt-32">
        <div className="p-8 relative">
          <form className="w-full" >
          
            <div className="w-full mb-3">
              <label
                htmlFor="details"
                className="block mb-2 text-black font-normal text-md"
              >
                Details:
              </label>
              <input
                name="details"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
                type="text"
                id="details"
                className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                placeholder=""
              />
              {formik.touched.details && formik.errors.details ? (
                <div
                  className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                  role="alert"
                >
                  <i
                    className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
                    aria-hidden="true"
                  ></i>
                  <div>
                    <span className="font-medium"> {formik.errors.details}</span>
                  </div>
                </div>
              ) : null}
            </div>
           
                 
            <div className="w-full mb-3">
              <label
                htmlFor="phone"
                className="block mb-2 text-black font-normal text-md"
              >
                Phone:
              </label>
              <input
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                type="tel"
                id="phone"
                className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                placeholder="ex. 01234567890"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div
                  className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                  role="alert"
                >
                  <i
                    className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
                    aria-hidden="true"
                  ></i>
                  <div>
                    <span className="font-medium"> {formik.errors.phone}</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-full mb-3">
              <label
                htmlFor="city"
                className="block mb-2 text-black font-normal text-md"
              >
                City:
              </label>
              <input
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                type="tel"
                id="city"
                className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                placeholder="Cairo"
              />
              {formik.touched.city && formik.errors.city ? (
                <div
                  className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                  role="alert"
                >
                  <i
                    className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
                    aria-hidden="true"
                  ></i>
                  <div>
                    <span className="font-medium"> {formik.errors.city}</span>
                  </div>
                </div>
              ) : null}
            </div>

            <button className="w-full border border-blue-500 hover:bg-blue-500 text-center font-semibold hover:text-white rounded-lg py-2 duration-300 mt-4">Pay Now</button>
          </form>
        </div>
      </div>
    
  </>
}
