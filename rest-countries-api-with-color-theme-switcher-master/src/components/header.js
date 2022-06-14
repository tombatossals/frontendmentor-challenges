import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header className="flex">
    <Link className="flex-1" to="/">
      {siteTitle}
    </Link>
    <div className="header__theme-switcher">Dark Mode</div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
