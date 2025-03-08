import { useEffect, useState } from 'react'
import styles from './news.module.css'

function Newsletter() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Tjek, om e-mailen allerede er gemt i localStorage, når komponenten monteres
    useEffect(() => {
        const savedEmail = localStorage.getItem('subscribedEmail')
        if (savedEmail) {
            setIsSubmitted(true) // Hvis e-mailen findes, skal du indstille formularen til tilstanden "indsendt"
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        // Gem e-mailen i localStorage
        localStorage.setItem('subscribedEmail', email)

        // Indstil formularen til tilstanden "indsendt"
        setIsSubmitted(true)
    }

    return (
        <div className={styles.newsletterContainer}>
            {!isSubmitted ? (
                <div className={styles.newsletterContent}>
                    <div className={styles.newsletterContentText}>
                        <h2>Nyhedsbrev</h2>
                        <h3>Få nyhederne fra gården på din mail.</h3>
                        <p>Tilmeld dig vores nyhedsbrev - så kan du altid følge med i, hvad der sker på farmen.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            required
                            type="email"
                            placeholder="Din email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">Tilmeld</button>
                    </form>
                </div>
            ) : (
                <div className={styles.successMessageContainer}>
                    <div className={styles.successMessageContent}>
                        <h2>Tak for din tilmelding!</h2>
                        <h3>Du har nu tilmeldt dig vores nyhedsbrev.</h3>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Newsletter