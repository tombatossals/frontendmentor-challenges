import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { formatNumber } from "../lib/utils"

const Card = ({ data }) => {
  const image = getImage(data.localImage)

  if (!image) {
    return
  }
  return (
    <div className="max-w element rounded mb-4 shadow-md overflow-hidden hover:brightness-95">
      <Link to={`/country/${data.slug}`}>
        <GatsbyImage
          className="w-full max-h-72 aspect-auto"
          image={image}
          alt={`${data.name.common} flag}`}
        />
      </Link>
      <div className="p-5">
        <Link to={`/country/${data.slug}`}>
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            {data.name.common}
          </h5>
        </Link>

        <ul>
          <li>
            <strong>Population:</strong> {formatNumber(data.population)}
          </li>
          <li>
            <strong>Region:</strong>{" "}
            <Link to={`/region/${data.slug.region}`}>{data.region}</Link>
          </li>
          <li>
            <strong>Capital:</strong> {data.capital}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Card
