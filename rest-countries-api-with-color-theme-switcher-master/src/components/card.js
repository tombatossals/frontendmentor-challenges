import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Card = ({ data }) => {
  const image = getImage(data.localImage)

  if (!image) {
    return
  }
  return (
    <div className="max-w element rounded mb-4 shadow-md overflow-hidden">
      <Link to={`/region/${data.region.toLowerCase()}/${data.slug.country}`}>
        <GatsbyImage
          className="w-full h-48 aspect-auto"
          image={image}
          alt={`${data.name.common} flag}`}
        />
      </Link>
      <div className="p-5">
        <Link to={`/region/${data.region}${data.slug.country}`}>
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            {data.name.common}
          </h5>
        </Link>

        <ul>
          <li>
            <strong>Population:</strong> {data.population}
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
