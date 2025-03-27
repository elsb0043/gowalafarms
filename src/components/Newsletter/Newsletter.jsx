import { useState } from 'react'
import styles from './news.module.css'

function Newsletter() {
    const [email, setEmail] = useState('') // State til at gemme den indtastede e-mail
    const [isSubmitted, setIsSubmitted] = useState(false) // State til at spore, om formularen er indsendt

    // Funktion til at håndtere formularindsendelse
    const handleSubmit = async (e) => {
        e.preventDefault() // Undgå sideopdatering

        // API-kald for at tilføje subscriber (forudsat at din API er tilgængelig på /subscription endpoint)
        try {
            const response = await fetch('http://localhost:3042/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            // Tjek, om svaret var vellykket
            if (!response.ok) {
                throw new Error('Failed to subscribe')
            }

            // Hvis det lykkes, skal du opdatere tilstanden og vise succesmeddelelsen
            setIsSubmitted(true)
        } catch (error) {
            // Hvis der var en fejl, skal du logge den på konsollen og vise en fejlmeddelelse
            console.error('Error subscribing:', error)
            setIsSubmitted(false) // Bliv på subscription, hvis det mislykkedes
        }
    }

    return (
        <div className={styles.newsletterContainer}>
            {/* Hvis brugeren ikke er tilmeldt endnu */}
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
                            onChange={(e) => setEmail(e.target.value)} // Opdater e-mail-tilstanden ved inputændring
                        />
                        <button type="submit">Tilmeld</button>
                    </form>
                </div>
            ) : (
                // Hvis brugeren allerede er tilmeldt
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