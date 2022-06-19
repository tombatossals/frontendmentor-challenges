import * as React from "react"
import { SearchIcon, XIcon } from "@heroicons/react/solid"
import { DebounceInput } from "react-debounce-input"
import { SearchContext } from "../context/search"

const Search = ({ setQuery }) => {
  const { search, setSearch } = React.useContext(SearchContext)

  const clearSearch = () => {
    setSearch("")
  }
  return (
    <form className="flex items-center border-1 border-red-100 flex-1 rounded-lg overflow-hidden element">
      <div className="relative w-full flex items-center pr-4">
        <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
          <SearchIcon className="w-5 h-5" />
        </div>
        <DebounceInput
          onChange={ev => setSearch(ev.target.value)}
          type="text"
          value={search}
          className="text-sm ml-3 block w-full pl-10 py-3 element border-none focus:ring-transparent focus:outline-none"
          placeholder="Search for a country..."
        />
        {search && (
          <XIcon className="h-5 w-5 cursor-pointer" onClick={clearSearch} />
        )}
      </div>
    </form>
  )
}

export default Search
