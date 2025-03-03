import styles from './nav.module.css'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { icons } from '../../services/Icons'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNav = () => {
    setIsOpen((prev) => !prev)
  }

  const closeNav = () => {
    setIsOpen(false)
  }

  const Nav = [
    { 
        path: "/shop", 
        title: "Shop" 
    },
    { 
        path: "/services", 
        title: "Services" 
    },
    { 
        path: "/about", 
        title: "About" 
    },
    { 
        path: "/contact", 
        title: "Contact" 
    },
    { 
        path: "/checkout", 
        title: "Checkout" 
    },
  ]

  return (
    <nav className={styles.navBar}>
      <Link to="/">
        <img className={styles.navLogo} src="/assets/logo/logo.png" alt="Logo"/>
      </Link>

      <div className={styles.navIcons}>
          <div className={styles.hamburger} onClick={toggleNav}>
              {isOpen ? <RxCross2 size={30} /> : <GiHamburgerMenu size={25} />}
          </div>

          <div className={styles.basket}>{icons['Basket']}</div>
      </div>

      <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        {Nav.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={closeNav}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation