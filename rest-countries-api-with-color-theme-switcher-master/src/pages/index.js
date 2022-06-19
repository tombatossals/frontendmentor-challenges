import * as React from "react"
import { graphql } from "gatsby"
import Card from "../components/card"
import Seo from "../components/seo"
import MainBar from "../components/mainbar"
import { SearchContext } from "../context/search"
import { RegionContext } from "../context/region"

const IndexPage = ({ data, location }) => {
  const { setRegion } = React.useContext(RegionContext)

  React.useEffect(() => {
    setRegion("")
  }, [setRegion])

  return (
    <SearchContext.Consumer>
      {({ search }) => (
        <>
          <Seo title="Home" />
          <MainBar />

          <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
            {data.allCountry.nodes
              .filter(country =>
                country.name.common.toLowerCase().includes(search)
              )
              .map(country => (
                <Card key={country.id} data={country} />
              ))}
          </div>
        </>
      )}
    </SearchContext.Consumer>
  )
}

export const query = graphql`
  query {
    allCountry {
      nodes {
        id
        slug
        name {
          common
        }
        population
        region
        capital
        localImage {
          childImageSharp {
            gatsbyImageData(
              width: 480
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default IndexPage
