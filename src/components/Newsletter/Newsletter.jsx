import styles from './news.module.css'

function Newsletter() {

    return (
        <div className={styles.newsletterContainer}>
           <div className={styles.newsletterContent}>
            <div className={styles.newsletterContentText}>
                <h2>Nyhedsbrev</h2>
                <h3>Få nyhederne fra gården på din mail.</h3>
                <p>Tilmeld dig vores nyhedsbrev - så kan du altid følge med i, hvad der sker på farmen.</p>
            </div>
            <input type="email" placeholder='Din email' />
            <button type="submit">Tilmeld</button>
           </div>
        </div>
    )
}

export default Newsletter