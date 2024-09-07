/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/finalProject assets/finalProject assets/images/slider-image-1.jpeg";
import img2 from "../../assets/finalProject assets/finalProject assets/images/slider-image-2.jpeg";
import img3 from "../../assets/finalProject assets/finalProject assets/images/slider-image-3.jpeg";
import img4 from "../../assets/finalProject assets/finalProject assets/images/grocery-banner-2.jpeg";
import img5 from "../../assets/finalProject assets/finalProject assets/images/slider-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed: 2000,
   centerPadding:0,
  };

  return (
    <>
      <div className="flex justify-center items-center w-[60%] mx-auto pt-28">
        
        <div className="w-3/4">
        
          <Slider {...settings}>
            <div>
              <img src={img1} alt="" className="w-full h-[400px] rounded-md " />
            </div>
            <div>
              <img src={img2} alt="" className="w-full h-[400px] rounded-md" />
            </div>
            <div>
              <img src={img3} alt="" className="w-full h-[400px] rounded-md" />
            </div>
          </Slider>
        </div>
        <div className="w-1/4 flex justify-center items-center flex-col">
          <div>
            <img src={img4} alt="" className="w-full h-[200px] " />
          </div>
          <div>
            <img src={img5} alt="" className="w-full h-[200px] " />
          </div>
        </div>
      </div>
    </>
  );
}
