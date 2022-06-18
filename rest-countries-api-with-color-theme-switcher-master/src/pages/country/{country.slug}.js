import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../../components/seo"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const CountryPage = ({ data: { country, allCountry } }) => {
  const image = getImage(country.localImage)

  const borders =
    allCountry.nodes &&
    allCountry.nodes.filter(
      c => country.borders && country.borders.includes(c.cca3)
    )
  return (
    <>
      <Seo title={country.name.common} />

      <div className="my-10 mx-20 country">
        <Link
          to="/"
          className="font-semibold py-2 px-6 element rounded shadow inline-flex content-center hover:brightness-95"
        >
          <ArrowLeftIcon className="w-4 h-5 mr-2" /> Back
        </Link>
        <div className="mt-20 lg:flex">
          <GatsbyImage
            className="w-full max-h-96 flex-1"
            image={image}
            alt={`${country.name.common} flag}`}
          />
          <div className="flex-1 lg:pl-20">
            <h1 className="font-bold text-2xl my-10">{country.name.common}</h1>
            <div className="lg:flex">
              <ul className="flex-1">
                <li className="mb-3">
                  <strong>Native Name:</strong> {country.name.common}
                </li>
                <li className="mb-3">
                  <strong>Population:</strong> {country.population}
                </li>
                <li className="mb-3">
                  <strong>Region:</strong> {country.region}
                </li>
                <li className="mb-3">
                  <strong>Sub Region:</strong> {country.subregion}
                </li>
                <li className="mb-3">
                  <strong>Capital:</strong> {country.capital}
                </li>
              </ul>
              <ul className="flex-1 mt-10 lg:mt-0">
                <li className="mb-3">
                  <strong>Top Level Domain:</strong> {country.tld}
                </li>
                <li className="mb-3">
                  <strong>Currencies:</strong> {country.currencies.join(", ")}
                </li>
                <li className="mb-3">
                  <strong>Languages:</strong> {country.languages.join(", ")}
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-col lg:flex-row">
              <strong>Border countries:</strong>
              <div>
                {borders.map(b => (
                  <Link
                    to={`/country/${b.slug}`}
                    key={b.slug}
                    className="font-semibold mr-2 my-2 py-1 px-6 element rounded shadow inline-flex hover:brightness-95"
                  >
                    {b.name.common}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query ($slug: String) {
    country(slug: { eq: $slug }) {
      id
      slug
      name {
        common
      }
      population
      region
      subregion
      languages
      tld
      capital
      borders
      currencies
      localImage {
        childImageSharp {
          gatsbyImageData(
            width: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
    allCountry {
      nodes {
        slug
        name {
          common
        }
        cca3
      }
    }
  }
`

export default CountryPage
