import { createContext, useContext, useState, useEffect } from 'react'

const BasketContext = createContext()

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState(() => {
        return JSON.parse(localStorage.getItem('basket')) || []
    })

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket))
    }, [basket])

    const addToBasket = (product) => {
        setBasket((prev) => [...prev, product])
    }

    const removeFromBasket = (index) => {
        setBasket((prev) => prev.filter((_, i) => i !== index))
    }

    const clearBasket = () => {
        setBasket([])
    }

    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket }}>
            {children}
        </BasketContext.Provider>
    )
}

export const useBasket = () => useContext(BasketContext)