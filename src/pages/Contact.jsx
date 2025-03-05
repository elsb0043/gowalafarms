import ContactForm from "../components/ContactPage/ContactForm/ContactForm"
import QuickContact from "../components/ContactPage/QuickContact/QuickContact"
import OurTeam from "../components/OurTeam/OurTeam"
import PageHeader from "../components/PageHeader/PageHeader"

function ContactPage() {

    return (
        <div>
            <PageHeader title="Kontakt Gowala" text="Vores kontaktinformationer" />
            <ContactForm />
            <QuickContact />
            <OurTeam />
        </div>
    )
}

export default ContactPage