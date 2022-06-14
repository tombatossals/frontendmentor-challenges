import * as React from "react"
import { FiSearch } from "@react-icons/all-files/fi/FiSearch"

const Search = ({ siteTitle }) => (
  <div className="search">
    <FiSearch className="search__icon" />
    <input
      className="search__input"
      placeholder="Search for a country..."
      type="text"
    />
  </div>
)

export default Search
