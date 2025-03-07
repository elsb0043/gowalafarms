import { useBasket } from '../../context/basketContext'
import Button from '../Button/Button'
import styles from './card.module.css'

function ProductCard({ product }) {
    const { addToBasket } = useBasket()

    return (
        <div className={styles.productsCards}>
            <div key={product._id} className={styles.productsBorder}>
                <div className={styles.productsCard}>
                    <div className={styles.procent}>60%</div>
                    <img src={product.image} alt={product.title} />
                    <h3>{product.title}</h3>
                    <h2>{product.price},-</h2>
                    <Button text="Tilføj til kurv" onClick={() => addToBasket(product)} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard