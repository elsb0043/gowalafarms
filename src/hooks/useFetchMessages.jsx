import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"

const useFetchMessages = () => {
    const [messages, setMessages] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useAuthContext()

    // HENT ALLE BESKEDER 
    const fetchMessages = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3042/messages")
            const data = await response.json()
            setMessages(data.data)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching messages:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    
    // OPRET BESKEDER
    const createMessage = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/message", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af beskeder") 
            }

            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error 
        }
    }


    // OPDATER BESKEDER
    const updateMessage = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/message", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af beskeder")
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved opdatering:", error)
            throw error
        }
    }


    // SLET BESKEDER
    const deleteMessage = async (params) => {
        
        try {
            await fetch(`http://localhost:3042/message/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const filteredArray = messages.filter((me) => me._id !== params)
            setMessages(filteredArray)
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT BESKEDER BASERET PÅ ID
    const fetchMessageById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
            const response = await fetch(`http://localhost:3042/message/${id}`)
    
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch message: ${errorText}`)
            }
    
            const message = await response.json()
            return message.data[0]
        } catch (error) {
            setError(error.message)
            console.error("Error fetching message:", error)
        } finally {
            setIsLoading(false) 
        }
    }

    const refetch = useCallback(() => {
        fetchMessages()
    }, [fetchMessages])
    
    useEffect(() => {
        fetchMessages()
    }, [])
    
    return {
        messages,
        setMessages,
        fetchMessages,
        fetchMessageById,
        createMessage,
        updateMessage,
        deleteMessage,
        isLoading,
        refetch,
        error,
    }
}

export { useFetchMessages }