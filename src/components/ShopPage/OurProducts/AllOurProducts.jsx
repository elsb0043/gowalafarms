import { useState, useEffect } from 'react'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { icons } from '../../../services/Icons'
import ProductCard from '../../ProductCard/ProductCard'
import styles from './our.module.css'

function AllOurProducts() {
    // Henter produkter fra useFetchProducts hook
    const { products } = useFetchProducts()
    
    // States til at håndtere filtrerede produkter og dropdown visibilitet
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    // UseEffect hook, som opdaterer de filtrerede produkter, når products ændres
    useEffect(() => {
        setFilteredProducts(products) // Starter med at vise alle produkter
    }, [products])

    // Alfabetet bruges til at oprette dropdown-menuen
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    // Funktion til at vise eller skjule dropdown-menuen
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible)
    }

    // Funktion til at filtrere produkter baseret på den valgte bogstav
    const filterProducts = (letter) => {
        if (!products || products.length === 0) return // Hvis der ikke er nogen produkter, skal vi ikke filtrere
        
        if (!letter) {
            setFilteredProducts(products) // Hvis der ikke er valgt et bogstav, vis alle produkter
        } else {
            // Filtrer produkter, der starter med det valgte bogstav
            const filtered = products.filter(pro => pro.title?.toUpperCase().startsWith(letter))
            setFilteredProducts(filtered)
        }
        setIsDropdownVisible(false) // Skjul dropdown, når filter er valgt
    }

    return (
        <div className={styles.productsContainer}>
            <div className={styles.productsText}>
                <h2>Alle vores produkter</h2>
                <h3>Alt på ét sted</h3>
                <p>Her på siden finder du alle vores friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra gården til dit bord.</p>
            </div>

            {/* Sorterings dropdown */}
            <div className={styles.productsSort}>
                <div className={styles.productsSortIcon} onClick={toggleDropdown}>
                    {icons['A-Z']} {/* Ikon til dropdown */}
                </div>

                {/* Dropdown-menuen vises, når isDropdownVisible er true */}
                {isDropdownVisible && (
                    <div className={styles.alphabetDropdown}>
                        <span onClick={() => filterProducts('')}>Alle</span> {/* "Alle" valget fjerner filter */}
                        {/* Opretter et klikbart element for hvert bogstav i alfabetet */}
                        {alphabet.map(letter => (
                            <span key={letter} onClick={() => filterProducts(letter)}>
                                {letter}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Viser de filtrerede produkter eller en besked, hvis ingen produkter findes */}
            <div className={styles.productsCards}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} /> 
                    ))
                ) : (
                    <p className={styles.noProducts}>Ingen produkter fundet.</p> 
                )}
            </div>
        </div>
    )
}

export default AllOurProducts
