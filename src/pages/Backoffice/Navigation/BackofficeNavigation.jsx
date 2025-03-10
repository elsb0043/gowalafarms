import { NavLink } from "react-router-dom"
import styles from "./backofficeNavigation.module.css"

const BackofficeNavigation = () => {
  return (
    <ul className={styles.backofficeNavigation}>
      {/* Navigation for Produkter */}
      <li>
        <NavLink
          to='/backoffice/products' // Link til produktsiden i backoffice
          // Klasseændring, når linket er aktivt
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Produkter
        </NavLink>
      </li>
      
      {/* Navigation for Hold */}
      <li>
        <NavLink
          to='/backoffice/employees' // Link til medarbejdersiden i backoffice
          // Klasseændring, når linket er aktivt
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Hold
        </NavLink>
      </li>
    </ul>
  )
}

export default BackofficeNavigation