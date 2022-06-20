import React, { useState, createContext } from "react"

const defaultState = ""

const SearchContext = createContext(defaultState)

const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("")

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContextProvider, SearchContext }
