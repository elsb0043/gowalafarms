import Newsletter from "../components/Newsletter/Newsletter"
import PageHeader from "../components/PageHeader/PageHeader"
import CowAPI from "../components/ServicesPage/CowAPI/CowAPI"

function ServicesPage() {

    return (
        <div>
            <PageHeader title="Gowala Tilbyder" text="Hvad vi tilbyder vores forbrugere" />
            <CowAPI />
            <Newsletter />
        </div>
    )
}

export default ServicesPage