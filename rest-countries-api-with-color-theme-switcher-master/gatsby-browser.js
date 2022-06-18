import React from "react"
import { ThemeContextProvider } from "./src/context/theme"
import Layout from "./src/components/layout"

import "./src/styles/global.css"

export const wrapRootElement = ({ element, props }) => (
  <ThemeContextProvider>
    <Layout {...props}>{element}</Layout>
  </ThemeContextProvider>
)
