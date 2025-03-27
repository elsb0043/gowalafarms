import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const usefetchSubscribers = () => {
    const [subscribers, setSubscribers] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useAuthContext()

    // HENT ALLE SUBSCRIBERS 
    const fetchSubscribers = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3042/subscribers")
            const data = await response.json()
            setSubscribers(data.data)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching subscribers:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    
    // OPRET SUBSCRIBERS
    const createSubscriber = async (email) => {
        try {
            const response = await fetch('http://localhost:3042/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send raw JSON
            })
    
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create subscriber')
            }
    
            const data = await response.json()
            console.log('Subscriber created:', data)
            return data
        } catch (error) {
            console.error('Error creating subscriber:', error.message)
            throw error
        }
    }
    


    // OPDATER SUBSCRIBERS
    const updateSubscriber = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/subscription", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af hold")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved opdatering:", error)
            throw error
        }
    }


    // SLET SUBSCRIBERS
    const deleteSubscriber = async (params) => {
        
        try {
            await fetch(`http://localhost:3042/subscription/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const filteredArray = subscribers.filter((ar) => ar._id !== params)
            setSubscribers(filteredArray)
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT SUBSCRIBERS BASERET PÅ ID
    const fetchSubscriberById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
            const response = await fetch(`http://localhost:3042/subscription/${id}`)
    
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch subscriber: ${errorText}`)
            }
    
            const subscriber = await response.json()
            return subscriber.data[0]
        } catch (error) {
            setError(error.message)
            console.error("Error fetching subscriber:", error)
        } finally {
            setIsLoading(false) 
        }
    }

    const refetch = useCallback(() => {
        fetchSubscribers()
    }, [fetchSubscribers])
    
    useEffect(() => {
        fetchSubscribers()
    }, [])
    
    return {
        subscribers,
        setSubscribers,
        fetchSubscribers,
        fetchSubscriberById,
        createSubscriber,
        updateSubscriber,
        deleteSubscriber,
        isLoading,
        refetch,
        error,
    }
}

export { usefetchSubscribers }