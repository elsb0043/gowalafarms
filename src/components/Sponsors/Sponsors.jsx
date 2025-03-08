import styles from "./sponsors.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/swiper-bundle.css"
import "swiper/css/effect-coverflow"
import "swiper/css/autoplay"

function Sponsors() {
  const images = [
    { src: "/assets/sponsors/01.png" },
    { src: "/assets/sponsors/02.png" },
    { src: "/assets/sponsors/03.png" },
    { src: "/assets/sponsors/04.png" },
    { src: "/assets/sponsors/05.png" },
  ]

  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        style={{
            "--swiper-navigation-color": "#5E9A13",
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        effect="slide"
        speed={1000}
        loop={true}
        slidesPerView={2}
        spaceBetween={50}
        className={styles.swiperContainer}
        breakpoints={{
          768: {
            slidesPerView: 5, 
            spaceBetween: 50, 
          },
          1024: {
            slidesPerView: 5, 
            spaceBetween: 60, 
          }
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className={styles.swiperContent}>
            <img src={img.src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Sponsors