
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [cat, setCat] = useState(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows:false,
    autoplay:true,
    autoplaySpeed: 2000,
   centerPadding:0,
   responsive: [
    {
      breakpoint: 768, 
      settings: {
        slidesToShow: 2, 
      },
    },
  ],
  };

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCat(res.data.data);
        console.log(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="pt-28">
        <Slider {...settings}>
          {cat?.map((category) => (
            <div key={category._id}>
              <img src={category.image} alt={category.name} className="w-full h-[200px]" />
              <h2 className="text-center font-semibold">{category.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}