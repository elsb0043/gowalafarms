import styles from "./swiper.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/swiper-bundle.css"
import "swiper/css/effect-coverflow"
import "swiper/css/autoplay"
import SwiperText from "./SwiperContent/SwiperText"

function Slider() {
  const images = [
    { src: "/assets/headerslider/01.jpg" },
    { src: "/assets/headerslider/02.jpg" },
    { src: "/assets/headerslider/03.jpg" },
    { src: "/assets/headerslider/04.jpg" },
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
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect='slide'
        speed={1000}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        className={styles.swiperContainer}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.src} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
        <SwiperText />
      </Swiper>
    </>
  )
}

export default Slider