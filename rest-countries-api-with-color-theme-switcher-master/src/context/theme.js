import React, { useState, createContext } from "react"

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light")
    setTheme(theme === "light" ? "dark" : "light")
  }

  document.body.className = theme === "dark" ? "dark" : "light"

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider, ThemeContext }
