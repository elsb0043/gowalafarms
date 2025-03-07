import { useState } from 'react'
import { useFetchEmployees } from '../../hooks/useFetchEmployees'
import styles from './team.module.css'

function OurTeam() {
    const { employees } = useFetchEmployees()
    const [openEmployee, setOpenEmployee] = useState(null)

    const toggleText = (id) => {
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
                {employees.map(em => (
                    <div key={em._id} className={styles.teamBorder}>
                        <div className={styles.teamCard}>
                            <img src={em.image} alt={em.name} />
                            <div className={`${styles.teamCardText} ${openEmployee === em._id ? styles.open : ''}`}>
                                <p>{em.text}</p>
                            </div>
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