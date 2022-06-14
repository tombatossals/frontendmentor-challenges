import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./header.css"
const Header = ({ siteTitle }) => (
  <header className="header">
    <Link className="header__logo" to="/">
      {siteTitle}
    </Link>
    <div className="header__theme-switcher">dark mode</div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
