import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header className="flex p-4 pt-8 pb-8 shadow-lg">
    <Link className="flex-1 text-base font-bold" to="/">
      {siteTitle}
    </Link>
    <div className="font-semibold text-sm">Dark Mode</div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
