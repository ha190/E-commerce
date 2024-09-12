/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { VerifyContext } from "../VerifyContext/VerifyContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const { isSent, newPassword, setinfo, info } = useContext(VerifyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[a-zA-Z][a-zA-Z0-9]{5,8}$/,
        `Password must
        * Start with a letter (either uppercase or lowercase).                                                                                                             
        * Be between 6 and 9 characters in total.
        * Can only contain letters (A-Z or a-z) and numbers (0-9) `
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,



    onSubmit: async (values) => {
      setLoading(true);
      setinfo({ email: values.email, newPassword: values.newPassword });
      console.log(info); 

        const response = await newPassword();
        console.log(response);

        if (response.data.status=="Success") {
          navigate("/login");
        }
      
        setLoading(false);

    },
  });

  return (
    <div className="pt-36 mx-24">
      <h1 className="text-2xl font-bold">Please enter your new password</h1>

      <form className="w-full my-3" onSubmit={formik.handleSubmit}>
        <input
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          placeholder="Enter your Email"
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

        <input
          name="newPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          type="password"  // Fixed typo here
          placeholder="Enter new Password"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-3"
          required
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div
            className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
          >
            <i
              className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
              aria-hidden="true"
            ></i>
            <div>
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div>
          </div>
        ) : null}
        <button
          type="submit"
          className="text-green-800 bg-green-500 border mt-3 border-green-800 hover:bg-green-600 hover:text-white font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin text-white"></i>
          ) : (
            <p className="text-white font-semibold">Set New Password</p>
          )}
        </button>
      </form>
    </div>
  );
}
