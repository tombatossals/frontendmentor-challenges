import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../../components/seo"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { formatNumber } from "../../lib/utils"
import { RegionContext } from "../../context/region"
const CountryPage = ({ data: { country, allCountry } }) => {
  const image = getImage(country.localImage)

  const { region } = React.useContext(RegionContext)

  const borders =
    allCountry.nodes &&
    allCountry.nodes.filter(
      c => country.borders && country.borders.includes(c.cca3)
    )
  borders.sort((a, b) => (a.slug > b.slug ? 1 : b.slug > a.slug ? -1 : 0))

  return (
    <>
      <Seo title={country.name.common} />

      <div className="py-10 mx-20 country flex-1 flex flex-col">
        <Link
          to={region ? `/region/${region}` : "/"}
          className="font-semibold py-2 flex-none px-6 element rounded shadow inline-flex content-center hover:brightness-95"
        >
          <ArrowLeftIcon className="w-4 h-5 mr-2" /> Back
        </Link>
        <div className="mt-20 xl:flex">
          <GatsbyImage
            className="max-w-full max-h-full"
            image={image}
            alt={`${country.name.common} flag}`}
          />
          <div className="flex-2 xl:pl-20">
            <h1 className="font-bold text-2xl my-10">{country.name.common}</h1>
            <div className="xl:flex">
              <ul className="flex-1">
                <li className="mb-3">
                  <strong>Native Name:</strong> {country.name.nativeName}
                </li>
                <li className="mb-3">
                  <strong>Population:</strong>{" "}
                  {formatNumber(country.population)}
                </li>
                <li className="mb-3">
                  <strong>Region:</strong> {country.region}
                </li>
                {country.subregion && (
                  <li className="mb-3">
                    <strong>Sub Region:</strong> {country.subregion}
                  </li>
                )}
                {country.capital && (
                  <li className="mb-3">
                    <strong>Capital:</strong> {country.capital}
                  </li>
                )}
              </ul>
              <ul className="flex-1 mt-10 xl:mt-0">
                <li className="mb-3">
                  <strong>Top Level Domain:</strong> {country.tld}
                </li>
                {country.currencies && (
                  <li className="mb-3">
                    <strong>Currencies:</strong> {country.currencies.join(", ")}
                  </li>
                )}
                {country.languages && (
                  <li className="mb-3">
                    <strong>Languages:</strong> {country.languages.join(", ")}
                  </li>
                )}
              </ul>
            </div>
            {borders.length > 0 && (
              <div className="mt-8">
                <strong className="mr-4 whitespace-nowrap lg:inline-block">
                  Border countries:
                </strong>
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
            )}
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
        nativeName
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
            width: 1280
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
