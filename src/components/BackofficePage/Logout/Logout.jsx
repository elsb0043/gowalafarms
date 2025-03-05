import { useAuthContext } from '../../../context/useAuthContext'
import styles from './logout.module.css'

function Logout() {
    const {signOut} = useAuthContext()

    return (
        <button className={styles.logoutButton} onClick={signOut}>Log ud</button>
    )
}

export default Logout