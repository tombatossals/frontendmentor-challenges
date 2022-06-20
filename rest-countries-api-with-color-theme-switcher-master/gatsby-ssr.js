import React from "react"
import { ThemeContextProvider } from "./src/context/theme"
import { SearchContextProvider } from "./src/context/search"
import { RegionContextProvider } from "./src/context/region"

import Layout from "./src/components/layout"

import "./src/styles/global.css"

export const wrapRootElement = ({ element, props }) => (
  <RegionContextProvider>
    <SearchContextProvider>
      <ThemeContextProvider>
        <Layout {...props}>{element}</Layout>
      </ThemeContextProvider>
    </SearchContextProvider>
  </RegionContextProvider>
)
