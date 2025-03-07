import Newsletter from "../components/Newsletter/Newsletter"
import OurProducts from "../components/HomePage/OurProducts/OurProducts"
import Slider from "../components/HomePage/Swiper/Swiper"
import MilkProducer from "../components/MilkProducer/MilkProducer"
import OurTeam from "../components/OurTeam/OurTeam"
import Sponsors from "../components/Sponsors/Sponsors"

function HomePage() {

    return (
        <div>
            <Slider />
            <MilkProducer />
            <OurProducts />
            <OurTeam />
            <Newsletter />
            <Sponsors />
        </div>
    )
}

export default HomePage