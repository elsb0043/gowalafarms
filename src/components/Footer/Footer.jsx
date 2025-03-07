import styles from './footer.module.css'
import { icons } from "../../services/Icons"

function Footer() {

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerInfo}>
                        <img className={styles.footerLogo} src="/assets/logo/logo.png" alt="Logo" />
                        <p>Gowala Farms er en dedikeret gård, der producerer friske mejeriprodukter og kvalitetskød med fokus på dyrevelfærd, bæredygtighed og autentisk smag.</p>
                    </div>
                    <div className={styles.footerContact}>
                        <div className={styles.footerContactInfo}>
                            <div className={styles.footerIcons}>{icons['Phone']}</div>
                            <p>
                                +88130-589-745-6987 
                                +1655-456-532
                            </p>
                        </div>
                        <div className={styles.footerContactInfo}>
                            <div className={styles.footerIcons}>{icons['Clock']}</div>
                            <p>
                                Man - Fre 09:00 - 18:00 
                                (undtagen helligdage)
                            </p>
                        </div>
                        <div className={styles.footerContactInfo}>
                            <div className={styles.footerIcons}>{icons['Pin']}</div>
                            <p>
                                Mejerigade 
                                14 Mejeby
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.allRightsReserved}>
                © 2024 <span className={styles.greenText}>Gowala.</span> All rights Reserved By
                <span className={styles.greenText}> LabArtisian</span> & 
                <span className={styles.greenText}> Viborg Media College</span>
            </div>
        </footer>
    )
}

export default Footer