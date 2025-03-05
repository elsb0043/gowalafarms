import { useFetchProducts } from '../../../hooks/useFetchProducts'
import Button from '../../Button/Button'
import styles from './products.module.css'

function OurProducts() {
    const { products } = useFetchProducts()

    return (
        <div className={styles.products}>
            <div className={styles.productsText}>
                <h2>Vores Produkter</h2>
                <h3>Vi har udvalgt de bedste produkter</h3>
                <p>Her finder du et udvalg af friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra gården til dit bord.</p>
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

export default OurProducts