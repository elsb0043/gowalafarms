import Sponsors from '../../Sponsors/Sponsors'
import styles from './partners.module.css'

function Partners() {

    return (
        <div className={styles.partnersContainer}>
            <div className={styles.partnersText}>
                <h2>Vores partnere</h2>
                <h3>er vi stolte af</h3>
                <p>Hos Gowala Farms samarbejder vi med nøje udvalgte partnere, der deler vores værdier om kvalitet, bæredygtighed og dyrevelfærd. Gennem disse partnerskaber sikrer vi, at vores produkter altid lever op til de højeste standarder.</p>
            </div>
            <div className={styles.partnersContent}>
                <Sponsors />
            </div>
        </div>
    )
}

export default Partners