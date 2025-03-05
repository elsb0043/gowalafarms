import { icons } from '../../../services/Icons'
import styles from './quick.module.css'

function QuickContact() {

    return (
        <div className={styles.quickContainer}>
           <div className={styles.quickContent}>
            <div className={styles.quickContentText}>
                <h2>Hurtig kontakt</h2>
                <p>Har du spørgsmål eller ønsker du at høre mere om vores produkter? Kontakt os – vi står altid klar til at hjælpe!</p>
            </div>
            <div className={styles.quickContentInfo}>
                <div className={styles.quickContentInfoCard}>
                    <div className={styles.quickIcons}>{icons['Phone']}</div>
                    <p>
                        +88130-589-745-6987 
                        +1655-456-532
                    </p>
                </div>
                <div className={styles.quickContentInfoCard}>
                    <div className={styles.quickIcons}>{icons['Clock']}</div>
                    <p>
                        Man - Fre 09:00 - 18:00 
                        (undtagen helligdage)
                    </p>
                </div>
                <div className={styles.quickContentInfoCard}>
                    <div className={styles.quickIcons}>{icons['Pin']}</div>
                    <p>
                        Mejerigade 
                        14 Mejeby
                    </p>
                </div>
            </div>
           </div>
        </div>
    )
}

export default QuickContact