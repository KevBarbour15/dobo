import "./image-gallery.css";
import { imagesArray } from "../../assets/images/photoArrays.js";
import { Navigation, Pagination, EffectFade } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ImageGallery = () => {
  return (
    <div className="gallery-container">
      <Swiper
        effect={"fade"}
        navigation={true}
        modules={[EffectFade, Pagination, Navigation]}
      >
        {imagesArray.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={image} alt="dobo" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
