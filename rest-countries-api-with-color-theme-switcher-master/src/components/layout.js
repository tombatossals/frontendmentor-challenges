/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Search from "./search"
import RegionSelector from "./region-selector"

import "normalize.css"
import "./layout.css"

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

  const [theme, toggleTheme] = React.useState("light")

  return (
    <div className={theme}>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="m-10 sm:flex">
        <Search />
        <div className="flex-1 flex sm:justify-end mt-8 sm:mt-0">
          <RegionSelector />
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
