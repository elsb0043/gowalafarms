import styles from './our.module.css'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import Button from '../../Button/Button'

function AllOurProducts() {
    const { products } = useFetchProducts()

    return (
        <div className={styles.team}>
            <div className={styles.teamText}>
                <h2>Alle vores produkter</h2>
                <h3>Alt på ét sted</h3>
                <p>Her på siden finder du alle vores friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra gården til dit bord.</p>
            </div>
            <div className={styles.productsCards}>
                {products.map(pro => 
                    <div key={pro._id} className={styles.productsBorder}>
                        <div className={styles.productsCard}>
                            <div className={styles.procent}>60%</div>
                            <img src={pro.image} />
                            <h3>{pro.title}</h3>
                            <h2>{pro.price},-</h2>
                            <Button text="Tilføj til kurv" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllOurProducts