import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const useFetchProducts = () => {
    // State til at gemme produkter, fejlbeskeder og loading-status
    const [products, setProducts] = useState([]) // Når komponenten først rendes, har vi ikke nogen produkter at vise, så vi initialiserer produkterne som et tomt array []
    const [error, setError] = useState(null) // Når komponenten først rendes, antager vi, at der ikke er nogen fejl, så vi sætter error til null
    const [isLoading, setIsLoading] = useState(false) // Når komponenten først rendes, er vi ikke i gang med at hente data, så isLoading sættes til false
    const { token } = useAuthContext() // Henter token fra auth-contexten

    // HENT ALLE PRODUCTS 
    // Bruger useCallback for at memoisere funktionen (dvs. den genoprettes ikke ved hver render)
    const fetchProducts = useCallback(async () => {
        setError(null) // Nulstiller fejl før ny forespørgsel
        setIsLoading(true) // Viser loading-status
        try {
            // Fetcher alle produkter fra API'et
            const response = await fetch("http://localhost:3042/products")
            const data = await response.json()
            setProducts(data.data) // Gemmer produkterne i state
        } catch (error) {
            setError(error.message) // Gemmer fejlbeskeden i state
            console.error("Error fetching products:", error)
        } finally {
            setIsLoading(false) // Skjuler loading-status
        }
    }, [])

    
    // OPRET PRODUKT
    const createProduct = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/product", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Sender token med i headeren
                },
                body: formData, // Sender formData som body
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af produkt") // Fejlhåndtering, hvis status ikke er OK
            }

            const result = await response.json()
            return result // Returnerer resultatet
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error // Kaster fejlen videre, så den kan håndteres andre steder
        }
    }


    // OPDATER PRODUKT
    const updateProduct = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/product", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, // Brug token fra props
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af produkt")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved opdatering:", error)
            throw error
        }
    }


    // SLET PRODUKT
    const deleteProduct = async (params) => {
        
        try {
            await fetch(`http://localhost:3042/product/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Filtrerer den slettede produkt ud fra state
            const filteredArray = products.filter((pro) => pro._id !== params)
            setProducts(filteredArray) // Opdaterer state med de tilbageværende produkter
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT PRODUKT BASERET PÅ ID
    const fetchProductById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
            // Fetcher en specifik produkt baseret på ID
            const response = await fetch(`http://localhost:3042/product/${id}`)
    
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch product: ${errorText}`)
            }
    
            const product = await response.json()
            return product.data[0] // Returnerer den fundne produkt
        } catch (error) {
            setError(error.message)
            console.error("Error fetching product:", error)
        } finally {
            setIsLoading(false) // Skjuler loading-status
        }
    }

    // Refetch-funktion, der kalder fetchProducts igen
    const refetch = useCallback(() => {
        fetchProducts()
    }, [fetchProducts])
    
    // useEffect til at hente produkter ved første render
    useEffect(() => {
        fetchProducts()
    }, [])
    
    // Returnerer alle funktioner og state-variabler
    return {
        products,
        setProducts,
        fetchProducts,
        fetchProductById,
        deleteProduct,
        createProduct,
        updateProduct,
        isLoading,
        refetch,
        error,
    }
}

export { useFetchProducts }