import * as React from "react"
import Search from "../components/search"
import RegionSelector from "../components/region-selector"

const MainBar = ({ region, query, setQuery }) => {
  return (
    <div className="m-10 sm:flex">
      <Search setQuery={setQuery} />
      <div className="flex-1 flex sm:justify-end mt-8 sm:mt-0">
        <RegionSelector region={region} />
      </div>
    </div>
  )
}

export default MainBar
