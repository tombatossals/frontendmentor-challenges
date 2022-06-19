import * as React from "react"
import { graphql } from "gatsby"
import Card from "../../components/card"
import Seo from "../../components/seo"
import MainBar from "../../components/mainbar"
import { RegionContext } from "../../context/region"
import { SearchContext } from "../../context/search"

const IndexPage = ({ data, location }) => {
  const [query, setQuery] = React.useState("")
  const { setRegion } = React.useContext(RegionContext)

  React.useEffect(() => {
    const region = location.pathname.split("/").slice(-1)[0]
    setRegion(region)
  }, [setRegion, location.pathname])

  return (
    <SearchContext.Consumer>
      {({ search }) => (
        <>
          <Seo title={data.allCountry.nodes[0].region} />

          <MainBar query={query} setQuery={setQuery} />
          <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
            {data.allCountry.nodes
              .filter(country =>
                country.name.common.toLowerCase().includes(query)
              )
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
  query ($slug: String) {
    allCountry(filter: { regionSlug: { eq: $slug } }) {
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
