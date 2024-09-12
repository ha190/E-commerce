/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { VerifyContext } from "../VerifyContext/VerifyContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Vcode() {
  const { isSent, verifyCode, setresetCode } = useContext(VerifyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .matches(/^\d{6}$/, "Code must be exactly 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setresetCode(values.code); // Set the reset code in context
      const response = await verifyCode();
      console.log(values.code);
      console.log(response);
      setLoading(false);

      if (response.data.status=="Success") {
        navigate("/Reset"); // Navigate to reset password page if verification is successful
      }
    },
  });

  return (
    <div className="pt-36 mx-24">
      <h1 className="text-2xl font-bold">Please enter your verification code of 6 Digits</h1>

      <form className="w-full my-3" onSubmit={formik.handleSubmit}>
        <input
          name="code"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.code}
          type="text"
          placeholder="Code"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        />
        {formik.touched.code && formik.errors.code ? (
          <div
            className="flex items-center p-2 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
          >
            <i
              className="flex-shrink-0 inline w-4 h-4 mx-2 mt-1 fa-solid fa-triangle-exclamation"
              aria-hidden="true"
            ></i>
            <div>
              <span className="font-medium">{formik.errors.code}</span>
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
            <p className="text-white font-semibold">Verify</p>
          )}
        </button>
      </form>
    </div>
  );
}