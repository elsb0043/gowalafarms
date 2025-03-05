import AboutGowala from "../components/AboutPage/AboutGowala/AboutGowala"
import Partners from "../components/AboutPage/Partners/Partners"
import MilkProducer from "../components/MilkProducer/MilkProducer"
import PageHeader from "../components/PageHeader/PageHeader"

function AboutPage() {

    return (
        <div>
            <PageHeader title="Om Gowala Farms" text="Vores kvalitet og service" />
            <AboutGowala />
            <Partners />
            <MilkProducer />
        </div>
    )
}

export default AboutPage