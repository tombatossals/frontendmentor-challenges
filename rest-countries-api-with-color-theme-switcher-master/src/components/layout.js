import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "normalize.css"
import "./layout.css"
import { ThemeContext } from "../context/theme"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { theme, toggleTheme } = React.useContext(ThemeContext)

  React.useEffect(() => {
    const t = localStorage.getItem("theme")
    if (t === "dark") {
      toggleTheme()
    }
  }, [])

  return (
    <div className={`${theme} app min-h-screen flex flex-col`}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className="min-h-full flex-1 flex flex-col">{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
