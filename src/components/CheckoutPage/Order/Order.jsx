import { useState } from 'react'
import { useBasket } from '../../../context/basketContext'
import Button2 from '../../Button/Button2'
import styles from './order.module.css'
import { icons } from '../../../services/Icons'

function Order() {
    const { basket, clearBasket, removeFromBasket } = useBasket()
    const [email, setEmail] = useState('')

    const total = basket.reduce((acc, product) => acc + product.price, 0)

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Bestilling afgivet!')
        clearBasket()
    }

    return (
        <div className={styles.orderContainer}>
            <div className={styles.orderContent}>
                <div className={styles.orderContentText}>
                    <h2>Bestil</h2>
                    <h3>Udfyld venligst formularen herunder</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.orderForm}>
                        <ul>
                            {basket.map((product, index) => (
                                <div key={product._id} className={styles.formContainer}>
                                    <img src={product.image} />
                                    <div className={styles.formContent}>
                                        <div className={styles.formContentOrder}>
                                            <li className={styles.formContentProduct} >{product.title}</li>
                                            <li className={styles.formContentPrice} >{product.price},-</li>
                                        </div>
                                        <div className={styles.formContentRemove} onClick={() => removeFromBasket(index)}>
                                            <div>
                                                {icons['X']}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <div className={styles.formTotal}>
                            <h3 className={styles.total}>Total:</h3>
                            <h3>{total},-</h3>
                        </div>
                    </div>
                    <div className={styles.formIAlt}>
                        <h3 className={styles.alt}>I alt</h3>
                        <h3>{total},00,-</h3>
                    </div>
                    <input
                        required
                        type="email"
                        placeholder="Din email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button2 text="Afgiv ordre" type='type' onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default Order