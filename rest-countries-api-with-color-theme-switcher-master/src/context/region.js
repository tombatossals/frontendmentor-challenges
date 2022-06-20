import React, { useState, createContext } from "react"

const defaultState = ""

const RegionContext = createContext(defaultState)

const RegionContextProvider = ({ children }) => {
  const [region, setRegion] = useState("")

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  )
}

export { RegionContextProvider, RegionContext }
