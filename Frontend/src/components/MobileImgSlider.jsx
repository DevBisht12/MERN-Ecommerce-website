import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../style/Slider.css'
import { Pagination } from 'swiper/modules';

export default function ImageSlider({imgSrc1,imgSrc2,imgSrc3}) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide >
            <img style={{width:'250px',height:'350px'}}  src={imgSrc1} alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide  >
            <img style={{width:'250px',height:'350px'}}  src={imgSrc2} alt="" srcset="" />
        </SwiperSlide>
        {imgSrc3 ?(
            <SwiperSlide >
            <img style={{width:'250px',height:'350px'}}   src={imgSrc3} alt="" srcset="" />
        </SwiperSlide>
        ):null}
      </Swiper>
    </>
  );
}
