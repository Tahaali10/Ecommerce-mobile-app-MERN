import React, { useState } from "react";
import Slider from "react-slick";
import bannerImgOne from "../../assets/images/banner/banner-1.png";
import bannerImgTwo from "../../assets/images/banner/banner-2.png";
import bannerImgThree from "../../assets/images/banner/banner-3.png";
import Image from "../designLayouts/Image";

const CustomSlide = ({ imgSrc }) => (
  <div style={{ position: "relative" }}>
    <Image imgSrc={imgSrc} />
  </div>
);

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
  
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              {/* <ul style={{ margin: "0px" }}>{dots}</ul> */}
            </div>
          ),
       
        },
      },
    ],
  };

  const slides = [
    { imgSrc: bannerImgOne },
    { imgSrc: bannerImgTwo },
    { imgSrc: bannerImgThree },
  ];

  return (
    <div className="w-50 bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
   
  );
};

export default Banner;
