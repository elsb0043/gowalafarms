import { useCallback, useEffect, useState } from "react"

const useFetchArticles = () => {
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // HENT ALLE ARTIKLER 
    const fetchArticles = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3042/articles")
            const data = await response.json()
            setArticles(data.data)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching articles:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // OPRET ARTIKLER
    const createArticle = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/article", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Fejl ved oprettelse af hold") 
            }

            const result = await response.json()
            return result
        } catch (error) {
            console.error("Fejl ved oprettelse:", error)
            throw error 
        }
    }


    // OPDATER ARTIKLER
    const updateArticle = async (formData) => {
        try {
            const response = await fetch("http://localhost:3042/article", {
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


    // SLET ARTIKLER
    const deleteArticle = async (params) => {
        
        try {
            await fetch(`http://localhost:3042/article/${params}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const filteredArray = articles.filter((ar) => ar._id !== params)
            setArticles(filteredArray)
        } catch (error) {
            console.error("Fejl ved sletning:", error)
        }
    }


    // HENT ARTIKLER BASERET PÅ ID
    const fetchArticleById = async (id) => {
        setError(null)
        setIsLoading(true)
    
        try {
            const response = await fetch(`http://localhost:3042/article/${id}`)
    
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch article: ${errorText}`)
            }
    
            const article = await response.json()
            return article.data[0]
        } catch (error) {
            setError(error.message)
            console.error("Error fetching article:", error)
        } finally {
            setIsLoading(false) 
        }
    }

    const refetch = useCallback(() => {
        fetchArticles()
    }, [fetchArticles])
    
    useEffect(() => {
        fetchArticles()
    }, [])
    
    return {
        articles,
        setArticles,
        fetchArticles,
        fetchArticleById,
        createArticle,
        updateArticle,
        deleteArticle,
        isLoading,
        refetch,
        error,
    }
}

export { useFetchArticles }