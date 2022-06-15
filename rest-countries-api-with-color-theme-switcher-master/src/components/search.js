import * as React from "react"
import { SearchIcon } from "@heroicons/react/outline"

const Search = () => (
  <form className="flex items-center border-1 border-red-100 flex-1">
    <div className="relative w-full bg-white">
      <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        className="text-sm rounded-lg ml-3 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for a country..."
      />
    </div>
  </form>
)

export default Search
