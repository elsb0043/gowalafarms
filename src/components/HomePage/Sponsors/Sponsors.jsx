import styles from "./sponsors.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules"
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
        modules={[EffectCoverflow, Autoplay, Navigation]}
        navigation
        style={{
            "--swiper-pagination-color": "#5E9A13",
            "--swiper-navigation-color": "#5E9A13",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect='slide'
        speed={1000}
        centeredSlides={true}
        loop={true}
        slidesPerView={2}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        className={styles.swiperContainer}
      >
        <div className={styles.swiperContent}>
            {images.map((img, index) => (
            <SwiperSlide key={index}>
                <img src={img.src} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </>
  )
}

export default Sponsors