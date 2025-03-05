import Order from "../components/CheckoutPage/Order/Order"
import PageHeader from "../components/PageHeader/PageHeader"

function CheckoutPage() {

    return (
        <div>
            <PageHeader title="Gowala Shopping" text="Færdiggør din bestilling" />
            <Order />
        </div>
    )
}

export default CheckoutPage