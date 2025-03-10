import { useState } from 'react'
import { useFetchEmployees } from '../../hooks/useFetchEmployees'
import styles from './team.module.css'

function OurTeam() {
    // Henter employee data via en custom hook
    const { employees } = useFetchEmployees()
    
    // State til at holde styr på, hvilken medarbejder der er blevet åbnet
    const [openEmployee, setOpenEmployee] = useState(null)

    // Funktion til at toggler (skifte) åben/lukket tilstand for medarbejderens tekst
    const toggleText = (id) => {
        // Hvis den samme medarbejder bliver trykket på igen, lukkes teksten, ellers åbnes den
        setOpenEmployee(openEmployee === id ? null : id)
    }

    return (
        <div className={styles.team}>
            <div className={styles.teamText}>
                <h2>Vores Hold</h2>
                <h3>2000+ ansatte siden 1975</h3>
                <p>De ansatte på Gowala Farms er passionerede fagfolk, der med omsorg og ekspertise sikrer sunde dyr og produkter af højeste kvalitet.</p>
            </div>
            <div className={styles.teamCards}>
                {/* Kort til at vise hver medarbejder */}
                {employees.map(em => (
                    <div key={em._id} className={styles.teamBorder}>
                        <div className={styles.teamCard}>
                            {/* Vis medarbejderens billede */}
                            <img src={em.image} alt={em.name} />
                            
                            {/* Hvis denne medarbejder er åben, vis teksten */}
                            <div className={`${styles.teamCardText} ${openEmployee === em._id ? styles.open : ''}`}>
                                <p>{em.text}</p>
                            </div>

                            {/* Klik på medarbejderens navn for at åbne/ lukke teksten */}
                            <h3 onClick={() => toggleText(em._id)}>
                                {em.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurTeam