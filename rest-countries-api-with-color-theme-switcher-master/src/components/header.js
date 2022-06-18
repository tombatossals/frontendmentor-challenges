import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"
import { ThemeContext } from "../context/theme"

const Header = ({ siteTitle }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)

  return (
    <header className="flex px-10 py-8 shadow-lg element">
      <Link className="flex-1 text-base font-bold" to="/">
        {siteTitle}
      </Link>
      <div
        className="font-semibold text-sm flex cursor-pointer"
        onClick={toggleTheme}
        aria-hidden="true"
      >
        {theme === "light" ? (
          <button className="flex items-center">
            <MoonIcon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
            Dark Mode
          </button>
        ) : (
          <button className="flex items-center">
            <SunIcon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
            Light Mode
          </button>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
