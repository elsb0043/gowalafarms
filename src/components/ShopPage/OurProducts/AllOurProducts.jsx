import { useState, useEffect } from 'react'
import styles from './our.module.css'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import Button from '../../Button/Button'
import { icons } from '../../../services/Icons'

function AllOurProducts() {
    const { products } = useFetchProducts()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    useEffect(() => {
        setFilteredProducts(products) // Sørg for, at filtrerede produkter opdateres, når produkterne ændres
    }, [products])

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible)
    }

    const filterProducts = (letter) => {
        if (!products || products.length === 0) return // Sørg for, at produkter findes før filtrering
        
        if (!letter) {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter(pro => pro.title?.toUpperCase().startsWith(letter))
            setFilteredProducts(filtered)
        }
        setIsDropdownVisible(false)
    }

    return (
        <div className={styles.productsContainer}>
            <div className={styles.productsText}>
                <h2>Alle vores produkter</h2>
                <h3>Alt på ét sted</h3>
                <p>Her på siden finder du alle vores friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra gården til dit bord.</p>
            </div>
            <div className={styles.productsSort}>
                <div className={styles.productsSortIcon} onClick={toggleDropdown}>
                    {icons['A-Z']}
                </div>
                {isDropdownVisible && (
                    <div className={styles.alphabetDropdown}>
                        <span onClick={() => filterProducts('')}>Alle</span>
                        {alphabet.map(letter => (
                            <span key={letter} onClick={() => filterProducts(letter)}>
                                {letter}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.productsCards}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(pro => (
                        <div key={pro._id} className={styles.productsBorder}>
                            <div className={styles.productsCard}>
                                <div className={styles.procent}>60%</div>
                                <img src={pro.image} alt={pro.title} />
                                <h3>{pro.title}</h3>
                                <h2>{pro.price},-</h2>
                                <Button text="Tilføj til kurv" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noProducts}>Ingen produkter fundet.</p>
                )}
            </div>
        </div>
    )
}

export default AllOurProducts