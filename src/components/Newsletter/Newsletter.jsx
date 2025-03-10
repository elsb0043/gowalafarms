import { useEffect, useState } from 'react'
import styles from './news.module.css'

function Newsletter() {
    // State til at gemme den indtastede email
    const [email, setEmail] = useState('')
    
    // State til at holde styr på om formularen er indsendt
    const [isSubmitted, setIsSubmitted] = useState(false)

    // useEffect hook der kører når komponenten monteres
    // Tjekker om der allerede er gemt en email i localStorage
    useEffect(() => {
        const savedEmail = localStorage.getItem('subscribedEmail')
        
        // Hvis der allerede er gemt en email, opdaterer vi tilstanden til 'submitted'
        if (savedEmail) {
            setIsSubmitted(true) // Sætter formularen til at vise 'tak for tilmeldingen'
        }
    }, []) // Tom array betyder, at denne effekt kun kører én gang ved komponentens første rendering

    // Håndterer formularens submit event
    const handleSubmit = (e) => {
        e.preventDefault() // Forhindrer formularen i at opdatere siden

        // Gemmer den indtastede email i localStorage
        localStorage.setItem('subscribedEmail', email)

        // Opdaterer tilstanden så formularen viser 'Tak for tilmeldingen'
        setIsSubmitted(true)
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
                        {/* Inputfelt til e-mail */}
                        <input
                            required // Kræver, at brugeren indtaster en email
                            type="email" // HTML5 e-mail inputtype som validere emailformatet
                            placeholder="Din email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Opdaterer email state ved ændring
                        />
                        {/* Submit button */}
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