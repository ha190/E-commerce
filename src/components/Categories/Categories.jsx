/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  let [cat, setCat] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  function getCat() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        console.log(res);
        setCat(res.data.data)
      })
      .catch((res) => {
        console.log(res);
      });
  }
  useEffect(() => {
    getCat();
  }, []);
  const handleCatClick = (Cat) => {
    setSelectedCat(Cat);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCat(null);
  };

  return <>
  <h1 className="font-bold text-green-600 uppercase mt-24 text-center text-3xl">All categories</h1>
      {cat == null ? (
        <div className="loader-layer">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-[85%] mx-auto flex justify-center items-evenly flex-wrap gap-5 py-14 px-6">
          {cat.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleCatClick(cat)}
              className="md:w-1/3 lg:w-1/4 rounded-md border hover:shadow-md hover:shadow-green-600 p-5 cursor-pointer duration-300"
            >
              <img src={cat.image} alt={cat.name} className="w-full" />
              <h2 className="text-lg text-center">{cat.name}</h2>
            </div>
          ))}
        </div>
      )}

      {isPopupOpen &&  (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-95  rounded-lg p-6 shadow-lg mt-6 flex justify-center items-end flex-col">
            <div className="flex justify-center items-center gap-8">
              <div>
            <h2 className="text-2xl font-semibold text-center text-green-700 ">{selectedCat.name}</h2>
            <p className="text-sm font-semibold text-center text-slate-700 ">{selectedCat.name}</p>
            </div>
            <img src={selectedCat.image} alt={selectedCat.name} className="w-full mx-auto" />
            </div>
            <div>
            <button
              onClick={closePopup}
              className="mt-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
  
  </>
}
