import PageHeader from "../components/PageHeader/PageHeader"
import AllOurProducts from "../components/ShopPage/OurProducts/AllOurProducts"

function ShopPage() {

    return (
        <div>
            <PageHeader title="Gowala Shopping" text="Vi er taknemlige for dit bidrag" />
            <AllOurProducts />
        </div>
    )
}

export default ShopPage