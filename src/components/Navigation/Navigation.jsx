import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { useBasket } from '../../context/basketContext'
import styles from './nav.module.css'
import { icons } from '../../services/Icons'

function Navigation() {
    const [isOpen, setIsOpen] = useState(false) // Styre, om menuen er åben eller lukket
    const { basket } = useBasket() // Henter basket contexten, som indeholder produkter i kurven

    const toggleNav = () => setIsOpen((prev) => !prev) // Skifter tilstanden for menuens åbning
    const closeNav = () => setIsOpen(false) // Lukker menuen

    // Navigation menu links og deres stier
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
        { 
          path: "/backoffice", 
          title: "Backoffice" 
        },
    ]

    return (
        <nav className={styles.navBar}>
            {/* Logo, som navigerer til startsiden */}
            <Link to="/">
                <img className={styles.navLogo} src="/assets/logo/logo.png" alt="Logo" />
            </Link>

            <div className={styles.navList}>
              <div className={styles.navIcons}>
                {/* Hamburger menu, der åbner og lukker navigationen */}
                <div className={styles.hamburger} onClick={toggleNav}>
                  {isOpen ? <RxCross2 size={30} /> : <GiHamburgerMenu size={25} />}
                </div>
                
                {/* Basket link til checkout */}
                <Link to="/checkout" className={styles.basket}>
                  {icons['Basket']} {/* Ikon for kurven */}
                  <div>{basket.length}</div> {/* Antal varer i kurven */}
                </Link>
              </div>
              
              {/* Links til navigationen, vises kun når menuen er åben */}
              <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                {Nav.map((item, index) => (
                    <NavLink key={index} to={item.path} onClick={closeNav} className={({ isActive }) => (isActive ? styles.active : '')}>
                        {item.title} {/* Titel på menuitem */}
                    </NavLink>
                ))}
              </div>
            </div>
        </nav>
    )
}

export default Navigation