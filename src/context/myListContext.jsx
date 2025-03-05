import { createContext, useContext, useState, useEffect } from "react"

const myListContext = createContext()

export const useMyList = () => useContext(myListContext)

export const MyListProvider = ({ children }) => {
  const [list, setList] = useState([])

  // Indlæs liste fra localStorage, når komponenten monteres
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || []
    setList(storedList) // Set the state with the stored list
  }, [])

  // Opdater localStorage, når listen ændres
  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("myList", JSON.stringify(list)) // Gem den opdaterede liste
    }
  }, [list])

  const addToList = (activity) => {
    if (!list.find((item) => item.title === activity.title)) {
      setList((prev) => [...prev, activity]) // Tilføj aktiviteten, hvis den ikke allerede er på listen
    }
  }

  const removeFromList = (title) => {
    setList((prev) => {
      const newList = prev.filter((activity) => activity.title !== title)
      localStorage.setItem("myList", JSON.stringify(newList)) // Opdater localStorage
      return newList
    })
  }

  return (
    <myListContext.Provider value={{ list, addToList, removeFromList }}>
      {children}
    </myListContext.Provider>
  )
}