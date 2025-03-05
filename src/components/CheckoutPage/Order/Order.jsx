import { useState } from 'react'
import Button2 from '../../Button/Button2'
import styles from './order.module.css'

function Order() {
    const [email, setEmail] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
            
        setIsSubmitted(true)
    }

    return (
        <div className={styles.orderContainer}>
           <div className={styles.orderContent}>
            <div className={styles.orderContentText}>
                <h2>Bestil</h2>
                <h3>Udfyld venligst formularen herunder</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="email"
                    placeholder="Din email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button2 text="Afgiv ordre" type='type' />
            </form>
           </div>
        </div>
    )
}

export default Order