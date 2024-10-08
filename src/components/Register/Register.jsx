/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";


export default function Register() {
  let {userLogin,setuserLogin}=useContext(UserContext);
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, "maximum length is 20")
      .min(3, "min length is 3")
      .required("Name is required"),
    email: Yup.string().required("Email is required").email("invalid email"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number")
      .required("Phone is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[a-zA-Z][a-zA-Z0-9]{5,8}$/,
        `Password must
        * Start with a letter (either uppercase or lowercase).                                                                                                             
        * Be between 6 and 9 characters in total.
        * Can only contain letters (A-Z or a-z) and numbers (0-9) `
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Doesn't match the password")
      .required("rePassword is required"),
  });
const navigate =useNavigate();
  const [APIerror, setAPIerror] = useState("");
  const [APIdone, setAPIdone] = useState("");
  const [isloading, setisloading] = useState(false);

  function handleRegister(values) {
    setisloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(function (res) {
        console.log(res);
        setAPIdone(res.data.message);
        setisloading(false);
        if (res.data.message=="success"){
        localStorage.setItem("userToken",res.data.token)
        setuserLogin(res.data.token)
        
        navigate("/")
      }
      })
      .catch(function (res) {
        console.log(res);
        setAPIerror(res.response.data.message);
        setisloading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,

    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="w-full mx-auto px-14 md:w-[60%]">
        <div className="pt-28 flex justify-center items-start flex-col">
          <h3 className="text-xl capitalize font-bold px-10 text-left mb-4">
            Register Now
          </h3>
        </div>
        {APIerror ? (
          <div
            className="flex items-center  justify-center p-2 mt-2 text-sm text-red-800  border border-red-300 rounded-lg bg-red-50 w-1/3 mx-auto"
            role="alert"
          >
            <i
              className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
              aria-hidden="true"
            ></i>
            <div>
              <span className="font-medium"> {APIerror}</span>
            </div>
          </div>
        ) : null}

        {/* {APIdone?(<div
          className="flex items-center  justify-center p-2 mt-2 text-sm text-green-800  border border-green-300 rounded-lg bg-green-50 w-1/3 mx-auto"
          role="alert"
        >
          <i
            className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-circle-check"
            aria-hidden="true"
          ></i>
          <div>
            <span className="font-medium"> {APIdone}</span>
          </div>
        </div>):null} */}

        <div className="p-8 relative">
          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className="w-full mb-3">
              <label
                htmlFor="name"
                className="block mb-2 text-black font-normal text-md"
              >
                Name:
              </label>
              <input
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                id="name"
                className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                placeholder="Haidy Ibrahem"
              />
              {formik.touched.name && formik.errors.name ? (
                <div
                  className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                  role="alert"
                >
                  <i
                    className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
                    aria-hidden="true"
                  ></i>
                  <div>
                    <span className="font-medium"> {formik.errors.name}</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-full mb-3">
              <label
                htmlFor="email"
                className="block mb-2 text-black font-normal text-md"
              >
                Email:
              </label>
              <input
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                id="email"
                className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                placeholder="example@example.com"
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                  role="alert"
                >
                  <i
                    className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
                    aria-hidden="true"
                  ></i>
                  <div>
                    <span className="font-medium"> {formik.errors.email}</span>
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
                htmlFor="password"
                className="block mb-2 text-black font-normal text-md"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
                className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                placeholder=""
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                  role="alert"
                >
                  <i
                    className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
                    aria-hidden="true"
                  ></i>
                  <div>
                    <span className="font-medium">
                      {" "}
                      {formik.errors.password}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-full mb-3">
              <label
                htmlFor="repass"
                className="block mb-2 text-black font-normal text-md"
              >
                Re-password :
              </label>
              <input
                type="password"
                name="rePassword"
                values={formik.values.rePassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id="repass"
                className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                placeholder=""
              />
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <div
                  className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                  role="alert"
                >
                  <i
                    className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
                    aria-hidden="true"
                  ></i>
                  <div>
                    <span className="font-medium">
                      {" "}
                      {formik.errors.rePassword}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className=" w-full py-5 flex justify-between">
             <Link to="/login"> <span className="font-bold hover:text-green-500 duration-500">Do you already have an account?  Login  </span></Link>
              {formik.errors.name ||
              formik.errors.email ||
              formik.errors.phone ||
              formik.errors.password ||
              formik.errors.rePassword ? (
                <button
                  type="submit"
                  className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center  me-4 disabled:bg-white disabled:border-2 disabled:border-gray-00 disabled:text-gray-500"
                  disabled
                >
                  Submit
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center me-4 disabled:bg-white disabled:border-2 disabled:border-gray-00 disabled:text-gray-500 "
                >
                  {isloading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
