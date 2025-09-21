// components/Slider.js
"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
// ไม่ได้ใช้ Image จาก next/image แล้ว
import slidesData from '../data/slides.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
  return (
    <div style={{ margin: '0' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.link}>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  // *** เพิ่ม 2 บรรทัดนี้เข้ามา ***
                  maxWidth: '100%',     // ให้รูปภาพไม่เกินความกว้างของมันเอง
                  maxHeight: '500px'    // กำหนดความสูงสูงสุด (สามารถปรับค่านี้ได้)
                }}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slider;