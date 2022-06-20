import * as React from "react"
import Search from "../components/search"
import RegionSelector from "../components/region-selector"

const MainBar = () => {
  return (
    <div className="m-10 sm:flex">
      <Search />
      <div className="flex-1 flex sm:justify-end mt-8 sm:mt-0">
        <RegionSelector />
      </div>
    </div>
  )
}

export default MainBar
