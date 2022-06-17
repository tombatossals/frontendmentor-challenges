import * as React from "react"
import { SearchIcon } from "@heroicons/react/outline"

const Search = () => (
  <form className="flex items-center border-1 border-red-100 flex-1 rounded-lg overflow-hidden element">
    <div className="relative w-full">
      <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
        <SearchIcon className="w-5 h-5" />
      </div>
      <input
        type="text"
        className="text-sm ml-3 block w-full pl-10 py-3 element border-none focus:ring-transparent focus:outline-none"
        placeholder="Search for a country..."
      />
    </div>
  </form>
)

export default Search
