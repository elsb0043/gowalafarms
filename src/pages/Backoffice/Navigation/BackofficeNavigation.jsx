import { NavLink } from "react-router-dom"
import styles from "./backofficeNavigation.module.css"

const BackofficeNavigation = () => {
  return (
    <ul className={styles.backofficeNavigation}>
      <li>
        <NavLink
          to='/backoffice/products'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Produkter
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/backoffice/employees'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Hold
        </NavLink>
      </li>
    </ul>
  )
}

export default BackofficeNavigation