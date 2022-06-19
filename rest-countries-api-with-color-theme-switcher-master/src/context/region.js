import React, { useState, createContext } from "react"

const RegionContext = createContext()

const RegionContextProvider = ({ children }) => {
  const [region, setRegion] = useState("")

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  )
}

export { RegionContextProvider, RegionContext }
