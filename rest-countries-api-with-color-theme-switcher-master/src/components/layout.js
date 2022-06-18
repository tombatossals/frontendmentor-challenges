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
    localStorage.getItem("theme") === "dark" && toggleTheme()
  }, [])

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={`${theme} app`}>
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <main>{children}</main>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
