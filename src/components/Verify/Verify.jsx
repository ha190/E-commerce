/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { VerifyContext } from "../VerifyContext/VerifyContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Verify() {
  const { forgotPassword, setemail,isSent } = useContext(VerifyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setemail(values.email);
      setLoading(true)
      const response = await forgotPassword(); 
      console.log(values.email);
      console.log(response); 
      setLoading(false)

      if (response.status==200) {
        navigate("/Vcode");
      }
    },
  });

  return (
    <div className="pt-36 mx-24">
      <h1 className="text-2xl font-bold">
        Please enter your Email to verify
      </h1>

      <form className="w-full my-3" onSubmit={formik.handleSubmit}>
        <input
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          placeholder="Email"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
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
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          </div>
        ) : null}
        <button
          type="submit"
          className="text-green-800 bg-green-500 border mt-3 border-green-800 hover:bg-green-600 hover:text-white font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
        >
          {loading?(<i className="fa-solid fa-spinner fa-spin text-white"></i>):<p className="text-white font-semibold">Send Code</p>}
        </button>
      </form>
    </div>
  );
}