import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { useBasket } from '../../context/basketContext'
import styles from './nav.module.css'
import { icons } from '../../services/Icons'

function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const { basket } = useBasket()

    const toggleNav = () => setIsOpen((prev) => !prev)
    const closeNav = () => setIsOpen(false)

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
            <Link to="/">
                <img className={styles.navLogo} src="/assets/logo/logo.png" alt="Logo" />
            </Link>

            <div className={styles.navList}>
              <div className={styles.navIcons}>
                <div className={styles.hamburger} onClick={toggleNav}>
                  {isOpen ? <RxCross2 size={30} /> : <GiHamburgerMenu size={25} />}
                </div>
                
                <Link to="/checkout" className={styles.basket}>
                  {icons['Basket']} 
                  <div>{basket.length}</div>
                </Link>
              </div>
              
              <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                {Nav.map((item, index) => (
                    <NavLink key={index} to={item.path} onClick={closeNav} className={({ isActive }) => (isActive ? styles.active : '')}>
                        {item.title}
                    </NavLink>
                ))}
              </div>
            </div>
        </nav>
    )
}

export default Navigation