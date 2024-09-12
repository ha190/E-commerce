/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let VerifyContext = createContext();

export default function VerifyContextProvider(props) {
  const [email, setemail] = useState("");
  const [resetCode, setresetCode] = useState("");
  const [info, setinfo] = useState({
    email: "",
    newPassword: "",
  });

  const [isSent, setisSent] = useState(false);

  function forgotPassword() {
    setisSent(false);
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setisSent(true);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function verifyCode() {
    setisSent(false);
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.status); 
        setisSent(true);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }





function newPassword(){
    setisSent(false);
    console.log(info)
    
    return axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",{info,})
    .then((res)=>{console.log(res) 
        return res
    })
    .catch((err)=>{console.log(err)
        return err
    })
}




  return (
    <VerifyContext.Provider
      value={{ email, setemail, forgotPassword, isSent, verifyCode,setresetCode ,resetCode,newPassword,setinfo,info}}
    >
      {props.children}
    </VerifyContext.Provider>
  );
}
