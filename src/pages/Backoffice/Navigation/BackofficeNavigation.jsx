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
          to='/backoffice/messages'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Beskeder
        </NavLink>
      </li>
    </ul>
  )
}

export default BackofficeNavigation