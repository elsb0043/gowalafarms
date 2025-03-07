import ContactForm from "../components/ContactPage/ContactForm/ContactForm"
import QuickContact from "../components/ContactPage/QuickContact/QuickContact"
import OurTeam from "../components/OurTeam/OurTeam"
import PageHeader from "../components/PageHeader/PageHeader"

function ContactPage() {

    return (
        <div>
            <PageHeader title="Kontakt Gowala" text="Vores kontaktinformationer" />
            <div className="contact">
                <ContactForm />
                <QuickContact />
            </div>
            <OurTeam />
        </div>
    )
}

export default ContactPage