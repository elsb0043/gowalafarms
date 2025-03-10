// Importerer useState fra React og useBasket fra basketContext for at håndtere kurven
import { useState } from 'react'
import { useBasket } from '../../../context/basketContext'
// Importerer ikoner til fjernelse af produkter fra kurven
import { icons } from '../../../services/Icons'
// Importerer CSS-moduler til styling
import styles from './order.module.css'

function Order() {
    // Henter nødvendige funktioner og værdier fra BasketContext
    const { basket, clearBasket, removeFromBasket } = useBasket()
    // State til email-input og formularens submit-status
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Beregner totalbeløbet af produkterne i kurven
    const total = basket.reduce((acc, product) => acc + product.price, 0) // reduce går gennem hvert produkt og lægger deres priser sammen (acc (accumulator) er en værdi, som starter på 0)

    // Funktion til at håndtere formularens submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // Opretter et objekt med ordredetaljer
        const orderData = {
            email,
            products: basket,
            total,
            date: new Date().toISOString(), // Gemmer den aktuelle dato og tid
        }

        // Henter eksisterende ordrer fra localStorage (eller en tom array, hvis ingen findes)
        const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || []

        // Tilføjer den nye ordre til historikken og gemmer den tilbage i localStorage
        localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, orderData]))

        // Tømmer kurven og resetter email og submit-status
        clearBasket()
        setEmail('')
        setIsSubmitted(true)
    }

    return (
        <div className={styles.orderContainer}>
            <div className={styles.orderContent}>
                {/* Vist hvis ordren er blevet sendt */}
                {isSubmitted ? (
                    <div className={styles.successMessage}>
                        <h2>Tak for din bestilling!</h2>
                        <p>Din ordre er modtaget og vil blive behandlet hurtigst muligt.</p>
                    </div>
                ) : (
                    <>
                        {/* Form med information om bestillingen */}
                        <div className={styles.orderContentText}>
                            <h2>Bestil</h2>
                            <h3>Udfyld venligst formularen herunder</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.orderForm}>
                                <ul>
                                    {/* Viser produkterne i kurven */}
                                    {basket.map((product, index) => (
                                        <div key={product._id} className={styles.formContainer}>
                                            <img src={product.image} alt={product.title} />
                                            <div className={styles.formContent}>
                                                <div className={styles.formContentOrder}>
                                                    <li className={styles.formContentProduct}>{product.title}</li>
                                                    <li className={styles.formContentPrice}>{product.price},-</li>
                                                </div>
                                                {/* Fjern produkt fra kurven ved klik */}
                                                <div className={styles.formContentRemove} onClick={() => removeFromBasket(index)}>
                                                    <div>{icons['X']}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                                {/* Vist når produkter er tilføjet, totalbeløbet */}
                                <div className={styles.formTotal}>
                                    <h3 className={styles.total}>Total:</h3>
                                    <h3>{total},-</h3>
                                </div>
                            </div>
                            {/* Vist samlet total i kurven */}
                            <div className={styles.formIAlt}>
                                <h3 className={styles.alt}>I alt</h3>
                                <h3>{total},00,-</h3>
                            </div>
                            {/* Input-felt til at indtaste email */}
                            <input
                                required
                                type="email"
                                placeholder="Din email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Opdaterer email-state
                            />
                            {/* Knappen til at afgive ordren */}
                            <button type='submit' className={styles.submitButton}>Afgiv ordre</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default Order