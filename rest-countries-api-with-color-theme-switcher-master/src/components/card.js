import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Card = ({ data }) => {
  const image = getImage(data.localImage)

  if (!image) {
    return
  }
  return (
    <div className="max-w-sm bg-white rounded mb-4 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <Link to={`/region/${data.region.toLowerCase()}/${data.slug}`}>
        <GatsbyImage
          className="w-full aspect-auto"
          image={image}
          alt={`${data.name.common} flag}`}
        />
      </Link>
      <div className="p-5">
        <Link to={`/region/${data.region}${data.slug}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name.official}
          </h5>
          <ul>
            <li>
              <strong>Population:</strong> {data.population}
            </li>
            <li>
              <strong>Region:</strong> {data.region}
            </li>
            <li>
              <strong>Capital:</strong> {data.capital}
            </li>
          </ul>
        </Link>
      </div>
    </div>
  )
}

export default Card
