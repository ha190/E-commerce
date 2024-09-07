/* eslint-disable no-unused-vars */
import React from 'react'

export default function Verify() {
  return <>
  <div className='pt-36 mx-24'>
    <h1 className='text-2xl font-bold '>Please enter your verification code</h1>
    
    <div className="w-full my-3">
            <input
              type="email"
              placeholder='Email'
              className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            className="text-green-800 bg-white border border-green-800 hover:bg-green-600 hover:text-white font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center "
          >
            Verify
          </button>

            </div>
  </>
}
