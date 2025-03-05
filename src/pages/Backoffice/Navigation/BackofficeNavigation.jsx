import { NavLink } from "react-router-dom"
import styles from "./backofficeNavigation.module.css"

const BackofficeNavigation = () => {
  return (
    <ul className={styles.backofficeNavigation}>
      <li>
        <NavLink
          to='/backoffice/produkter'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Produkter
        </NavLink>
      </li>
    </ul>
  )
}

export default BackofficeNavigation