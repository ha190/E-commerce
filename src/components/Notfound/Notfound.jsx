/* eslint-disable no-unused-vars */
import React from 'react'
import error from "../../assets/error.svg"
export default function Notfound() {
  return <>
  <div className='flex justify-center items-center flex-col h-lvh bg-slate-100 m-0 p-0'>
   <h1 className='text-center text-3xl font-extrabold capitalize text-green-800'>page not found</h1>
   <img src={error} alt="" className='w-1/4 m-0 p-0' />
  </div> 
  </>
}
