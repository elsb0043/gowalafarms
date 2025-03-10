import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

/* En hook, der effektivt håndterer produktdata og API-kald med state-håndtering og genbrug af funktioner (memoisering) for bedre performance */

const useFetchProducts = () => {
    // State til at gemme produkter, fejlbeskeder og loading-status
    const [products, setProducts] = useState([]) // Når komponenten først rendes, har vi ikke nogen produkter at vise, så vi initialiserer produkterne som et tomt array [] (products gemmer produktdate)
    const [error, setError] = useState(null) // Når komponenten først rendes, antager vi, at der ikke er nogen fejl, så vi sætter error til null
    const [isLoading, setIsLoading] = useState(false) // Når komponenten først rendes, er vi ikke i gang med at hente data, så isLoading sættes til false (isLoading er en boolean for loading-status)
    
    // Henter token fra auth-contexten (bruges til autentificering i API-kald)
    const { token } = useAuthContext()

    // HENT ALLE PRODUKTER
    // useCallback gør, at funktionen genbruges i stedet for at blive lavet på ny ved hver rendering (memoize)
    const fetchProducts = useCallback(async () => {
        setError(null) // Nulstiller tidligere fejl
        setIsLoading(true) // Viser loading-status
        try {
            // Henter alle produkter fra API'et
            const response = await fetch("http://localhost:3042/products")
            
            // Hvis responsen ikke er OK, kaster vi en fejl
            if (!response.ok) {
                throw new Error("Fejl ved hentning af produkter")
            }

            const data = await response.json() // Konverterer responsen til JSON
            setProducts(data.data) // Gemmer produkterne i state
        } catch (error) {
            setError(error.message) // Gemmer fejlbeskeden i state
            console.error("Error fetching products:", error)
        } finally {
            setIsLoading(false) // Skjuler loading-status (uanset succes eller fejl)
        }
    }, []) // Tom array → funktionen bliver kun oprettet én gang (medmindre afhængigheder ændres)

    // OPRET PRODUKT
    const createProduct = async (formData) => {
        try {
            // Sender en POST-request til API'et med formData som body
            const response = await fetch("http://localhost:3042/product", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Sender token i headeren
                },
                body: formData,
            })

            // Hvis responsen ikke er OK, kaster vi en fejl
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af produkt")
            }

            const result = await response.json() // Konverterer responsen til JSON
            return result // Returnerer resultatet til komponenten
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error // Kaster fejlen videre, så den kan håndteres i komponenten
        }
    }

    // OPDATER PRODUKT
    const updateProduct = async (formData) => {
        try {
            // Sender en PUT-request til API'et med formData som body
            const response = await fetch("http://localhost:3042/product", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, // Sender token i headeren
                },
                body: formData,
            })

            // Hvis responsen ikke er OK, kaster vi en fejl
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af produkt")
            }

            const result = await response.json() // Konverterer responsen til JSON
            return result // Returnerer resultatet til komponenten
        } catch (error) {
            console.error("Fejl ved opdatering:", error)
            throw error
        }
    }

    // SLET PRODUKT
    const deleteProduct = async (params) => {
        try {
            // Sender en DELETE-request til API'et med produktets ID
            await fetch(`http://localhost:3042/product/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // Sender token i headeren
                },
            })

            // Filtrerer det slettede produkt ud fra state
            const filteredArray = products.filter((pro) => pro._id !== params)
            setProducts(filteredArray) // Opdaterer state med de tilbageværende produkter
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }

    // HENT PRODUKT BASERET PÅ ID
    const fetchProductById = async (id) => {
        setError(null) // Nulstiller tidligere fejl
        setIsLoading(true) // Viser loading-status

        try {
            // Henter et specifikt produkt fra API'et baseret på ID
            const response = await fetch(`http://localhost:3042/product/${id}`)

            // Hvis responsen ikke er OK, kaster vi en fejl med fejlbeskeden fra API'et
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch product: ${errorText}`)
            }

            const product = await response.json() // Konverterer responsen til JSON
            return product.data[0] // Returnerer den fundne produkt
        } catch (error) {
            setError(error.message) // Gemmer fejlbeskeden i state
            console.error("Error fetching product:", error)
        } finally {
            setIsLoading(false) // Skjuler loading-status
        }
    }

    // Memoiseret funktion til at kalde `fetchProducts` igen (Husker hvordan du henter produkterne)
    const refetch = useCallback(() => {
        fetchProducts() // Henter produkterne
    }, [fetchProducts]) // Hvis fetchProducts ændrer sig, lærer knappen at hente på den nye måde

    // Kalder `fetchProducts` ved første render (eller når komponenten monteres)
    useEffect(() => {
        fetchProducts() // Henter produkterne
    }, []) // Tom array - kaldes kun én gang ved første render (Tom array betyder "Gør det kun én gang")

    // Returnerer alle funktioner og state-variabler 
    return {
        products,          // Liste over produkter
        setProducts,       // Funktion til at opdatere produkterne manuelt
        fetchProducts,     // Funktion til at hente alle produkter
        fetchProductById,  // Funktion til at hente produkt baseret på ID
        deleteProduct,     // Funktion til at slette produkt
        createProduct,     // Funktion til at oprette produkt
        updateProduct,     // Funktion til at opdatere produkt
        isLoading,         // Boolean til at indikere loading-status
        refetch,           // Funktion til at genhente produkter
        error,             // Error-message hvis noget går galt
    }
}

export { useFetchProducts }