/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => {
        console.log(res);
        setBrands(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <h1 className="font-bold text-green-600 uppercase mt-24 text-center text-3xl">All Brands</h1>
      {brands == null ? (
        <div className="loader-layer">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-[85%] mx-auto flex justify-center items-evenly flex-wrap gap-5 py-14 px-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => handleBrandClick(brand)}
              className="md:w-1/3 lg:w-1/5 rounded-md border hover:shadow-md hover:shadow-green-600 p-5 cursor-pointer duration-300"
            >
              <img src={brand.image} alt={brand.name} className="w-full" />
              <h2 className="text-lg text-center">{brand.name}</h2>
            </div>
          ))}
        </div>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white bg-opacity-95  rounded-lg p-6 shadow-lg mt-6 flex justify-center items-end flex-col">
            <div className="flex justify-center items-center gap-8">
              <div>
            <h2 className="text-2xl font-semibold text-center text-green-700 ">{selectedBrand.name}</h2>
            <p className="text-sm font-semibold text-center text-slate-700 ">{selectedBrand.name}</p>
            </div>
            <img src={selectedBrand.image} alt={selectedBrand.name} className="w-full mx-auto" />
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
  );
}